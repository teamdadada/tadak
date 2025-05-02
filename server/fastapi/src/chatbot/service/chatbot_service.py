from typing import List
from fastapi import UploadFile

from src.common.config import qdrant_config
from src.common.config.qdrant_config import qdrantClient, CHATBOT_COLLECTION, embeddings
import src.chatbot.util.embedding_util as embedding_util
from transformers import AutoTokenizer, AutoModelForCausalLM
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from langchain_community.vectorstores import Qdrant

# todo: solar 모델로 교체
load_dotenv()

# model_name = "meta-llama/Llama-3.1-8B-Instruct"
# HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

qdrant = Qdrant(
        client=qdrantClient,
        collection_name=qdrant_config.CHATBOT_COLLECTION,
        embeddings=embeddings,
    )

# llm_model = InferenceClient(model=model_name, token=HUGGINGFACE_API_KEY)

def get_response(query: str):
    # Step 1: 벡터DB에서 관련 문서 검색
    relevant_docs = qdrant.similarity_search(query, k=3)
    context = "\n".join([doc.page_content for doc in relevant_docs])

    # Step 2: LLM에 context와 query 전달
    prompt = f"""
            다음 정보를 참고하여 질문에 답변해줘:
            \n
            \n{context}
            \n
            \n질문: {query}
            """
    # response = llm_model.text_generation(
    #     prompt,
    #     max_new_tokens=100,
    #     temperature=0.5
    # )
    #
    # return response

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