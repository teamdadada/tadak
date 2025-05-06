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
# from redis import Redis

load_dotenv()

qdrant = Qdrant(
        client=qdrantClient,
        collection_name=qdrant_config.CHATBOT_COLLECTION,
        embeddings=embeddings,
    )

system_prompt = ("")
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}\n\n{context}"),
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
        prompt=prompt,
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
    return result["answer"] if "answer" in result else result


def get_memory(user_id: str, window_size=30):
    chat_memory= RedisChatMessageHistory(
        session_id=user_id,
        url="redis://localhost:6379"
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


# r = Redis(host="localhost", port=6379, db=0)
#
# def trim_chat_history(user_id, max_length=50): # 남길 대화 수
#     key = f"session:{user_id}"  # RedisChatMessageHistory 내부 키 형식에 맞춰야 함
#     r.ltrim(key, 0, max_length * 2 - 1)
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