import os
from typing import List
from fastapi import UploadFile

from src.common.config import qdrant_config
from src.common.config.qdrant_config import qdrantClient, CHATBOT_COLLECTION, embeddings
import src.chatbot.util.embedding_util as embedding_util
from dotenv import load_dotenv
from langchain_community.vectorstores import Qdrant
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import (
    create_history_aware_retriever,
    create_retrieval_chain,
)
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import src.chatbot.util.gemini_util as gemini
from redis import Redis
from urllib.parse import quote

load_dotenv()

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = int(os.getenv("REDIS_PORT"))
redis_pw = os.getenv("REDIS_PASSWORD")
REDIS_PASSWORD = quote(redis_pw)

qdrant = Qdrant(
        client=qdrantClient,
        collection_name=qdrant_config.CHATBOT_COLLECTION,
        embeddings=embeddings,
    )

system_prompt = (
    "Your name is '타덕'."
    "You are a keyboard expert assisting users with choosing mechanical and custom keyboards."
    "You recommend keyboards based on typing style, use case, and user preferences."
    "You answer keyboard-related questions clearly and helpfully."
    "You explain keyboard switches, layouts, and customization options."
    "You provide simple explanations for technical keyboard terms."
    "You maintain a friendly and casual tone like a close friend."
    "Use informal language."
    "Always end every sentence you speak with '덕'."
    "Keep your responses concise and do not exceed 1500 characters."
)

retriever_system_prompt = (
    "You are retrieving documents to help 타덕, a keyboard expert, answer user questions."
    "Prioritize documents related to mechanical keyboards, keyboard switches, layouts, keycap customization, typing styles, and user preferences."
    "Ignore irrelevant content."
    "Focus on retrieving concise, accurate, and contextually relevant information."
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}\n\n{context}"),
    ]
)

retriever_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", retriever_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

def get_response(user_id: int, query: str):
    memory = get_memory(str(user_id))
    combine_docs_chain = create_stuff_documents_chain(
        gemini.model,
        prompt
    )
    retriever= create_history_aware_retriever(
        llm=gemini.model,
        prompt=retriever_prompt,
        retriever=qdrant.as_retriever()
    )
    chain = create_retrieval_chain(
        retriever=retriever,
        combine_docs_chain=combine_docs_chain
    )

    result = chain.invoke({
        "chat_history": memory.chat_memory.messages,
        "input": query
    })
    answer = result["answer"] if "answer" in result else result

    memory.chat_memory.add_user_message(query)
    memory.chat_memory.add_ai_message(answer)
    trim_chat_history(str(user_id), 40)

    return {"response" :answer}


def get_memory(user_id: str, window_size=30):
    chat_memory= RedisChatMessageHistory(
        session_id=user_id,
        url=f"redis://:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}"
    )
    return ConversationBufferWindowMemory(
        memory_key="chat_history",
        chat_memory=chat_memory,
        k=window_size,
        return_message=True
    )

async def upload_files(files: List[UploadFile], file_detail: str):
    responses = []

    for file in files:
        file_name = file.filename

        if await is_duplicated_file(file_name):
            responses.append({
                "file": file_name,
                "status": "exists",
                "message": "이미 존재하는 파일명"
            })
        else:
            docs = await embedding_util.load_documents([file], file_detail)
            splits = embedding_util.get_docs_split_list(docs)
            embedding_util.embed_documents(splits)

            responses.append({
                "file": file_name,
                "status": "success",
                "message": f"{file_name}: {len(splits)}개 청크로 임베딩"
            })
    return responses

def trim_chat_history(user_id: str, max_length=50): # 남길 대화 수
    r = Redis(host=REDIS_HOST, port=REDIS_PORT, password= redis_pw, db=0)
    key = f"message_store:{user_id}"  # RedisChatMessageHistory 내부 키 형식에 맞춰야 함
    r.ltrim(key, 0, max_length * 2 - 1)

async def is_duplicated_file(file_name: str) -> bool:
    result, _ = qdrantClient.scroll(
        collection_name=CHATBOT_COLLECTION,
        scroll_filter={
            "must":[
                {"key":"file_name", "match":{"value":file_name}}
            ]
        },
        limit=1
    )
    return len(result) > 0

def format_history(messages):
    return [
        {"type": message.type, "content": message.content}
        for message in messages
    ]