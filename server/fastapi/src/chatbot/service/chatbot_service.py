from typing import List
from fastapi import APIRouter, UploadFile
from src.common.config.qdrant_config import qdrantClient, CHATBOT_COLLECTION
import src.chatbot.util.embedding_util as embedding_util

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