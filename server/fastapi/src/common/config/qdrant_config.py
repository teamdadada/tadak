import os
from qdrant_client import QdrantClient

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_PORT = int(os.getenv("QDRANT_PORT")) # 개발용, 배포용 포트 번호 환경변수 확인

CHATBOT_COLLECTION = "chatbot-docs"
RECOMMENDATION_ITEM_COLLECTION = "recommendation-embeddings"

qdrantClient = QdrantClient(host=QDRANT_URL, port=QDRANT_PORT)