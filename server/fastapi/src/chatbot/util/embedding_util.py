import os
from typing import List
from fastapi import UploadFile
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from langchain_huggingface import HuggingFaceEmbeddings
import src.common.config.qdrant_config as qdrant_config
from langchain_core.documents import Document

# todo: documentparser에서 upstage api 제거
async def load_documents(files: List[UploadFile], file_detail: str):
    # 파일 로드 및 파일 이름 저장
    docs = []

    for file in files:
        file_name = file.filename
        extension = os.path.splitext(file_name)[1].lower()

        if extension != ".txt":
            raise ValueError(f"지원하지 않는 파일 형식입니다: {extension}")

        # 파일 메모리에서 읽기
        file_bytes = await file.read()
        text = file_bytes.decode("utf-8")

        doc = Document(
            page_content=text,
            metadata={
                "file_name": file_name,
                "file_detail": file_detail
            }
        )
        docs.append(doc)

    return docs


def get_docs_split_list(docs):
    # 문서 청크 단위 및 오버랩 크기 설정
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )

    return text_splitter.split_documents(docs)


def embed_documents(docs):
    embeddings = HuggingFaceEmbeddings(model_name='jhgan/ko-sroberta-multitask')

    Qdrant.from_documents(
        url=qdrant_config.QDRANT_URL,
        port=qdrant_config.QDRANT_PORT,
        collection_name=qdrant_config.CHATBOT_COLLECTION,
        embedding=embeddings,
        documents=docs
    )