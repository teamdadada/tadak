from src.common.config.qdrant_config import qdrantClient, CHATBOT_COLLECTION
from src.common.config import qdrant_config
from qdrant_client.http.models import Distance, VectorParams

qdrantClient = qdrant_config.qdrantClient

def init_collection():
    # 1. 현재 컬렉션 목록 조회
    collections = qdrantClient.get_collections().collections
    existing_names = [col.name for col in collections]

    if qdrant_config.CHATBOT_COLLECTION not in existing_names:
        print(f"챗봇 컬랙션이 없어서 새로 생성합니다.")
        qdrantClient.create_collection(
            collection_name=qdrant_config.CHATBOT_COLLECTION,
            vectors_config=VectorParams(size=qdrant_config.CHATBOT_DIMENSION, distance=Distance.COSINE)
        )

def delete_collection(name):
    collections = qdrantClient.delete_collection(name)
    return {f"컬렉션 '{name}'이 삭제되었습니다."}


def get_uploaded_doc_info(file_name: str):
    result, _ = qdrantClient.scroll(
        collection_name=CHATBOT_COLLECTION,
        scroll_filter={
            "must": [
                {"key": "file_name", "match": {"value": file_name}}
            ]
        },
        limit=10
    )

    response = {
        "file_name": file_name,
        "chunks_found": len(result),
        "chunks": []
    }

    for doc in result:
        response["chunks"].append({
            "payload": doc.payload,
            "score": doc.score
        })

    return response
