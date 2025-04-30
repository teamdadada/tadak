import os
from io import BytesIO
from typing import List
from fastapi import UploadFile
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_upstage import UpstageEmbeddings, UpstageDocumentParseLoader
from langchain.vectorstores import Qdrant
from src.common.config.qdrant_config import qdrantClient, CHATBOT_COLLECTION

UPSTAGE_API_KEY = os.getenv("UPSTAGE_API_KEY")


async def load_documents(files: List[UploadFile], file_detail: str):
    # 파일 로드 및 파일 이름 저장
    docs = []

    for file in files:
        # 파일 이름 추출
        file_name = file.name

        # 업로드된 파일을 메모리에서 읽음
        file_bytes = await file.read()  # 비동기 방식으로 파일 전체 읽기

        # 현재 UpstageDocumentParseLoader는 경로만 지원하므로, 임시 파일 생성 필요
        temp_path = f"/tmp/{file_name}"
        with open(temp_path, "wb") as f:
            f.write(file_bytes)

        # 파일 로드
        loader = UpstageDocumentParseLoader(
            temp_path,
            output_format='text',  # 결과물 형태 : text
            coordinates=False  # 이미지 OCR 좌표계를 가져오지 않음
        )
        file_docs = loader.load()

        for doc in file_docs:
            doc.metadata["file_name"] = file_name
            doc.metadata["file_detail"] = file_detail

        docs.extend(file_docs)

        # 임시 파일 제거
        os.remove(temp_path)

    return docs


def get_docs_split_list(docs):
    # 문서 청크 단위 및 오버랩 크기 설정
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )

    # Document list에서 각 Document 청킹
    split_list = []

    for doc in docs:
        split_chunks = text_splitter.split([doc])

        # 각 청크에 메타데이터 추가
        for chunk in split_chunks:
            chunk.metadata.update(doc.metadata)

        # 기존 리스트에 청크들 추가
        split_list.extend(split_chunks)

    return text_splitter.split_documents(docs)


def embed_documents():
    embeddings = UpstageEmbeddings(
        api_key=UPSTAGE_API_KEY,
        model="solar-embedding-1-large"
    )

    vector_stores = Qdrant(
        client=qdrantClient,  # 기존 qdrant client 인스턴스를 langchain wrapper에 연결
        collection=CHATBOT_COLLECTION,
        embedding=embeddings
    )