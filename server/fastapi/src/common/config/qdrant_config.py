import os
from qdrant_client import QdrantClient
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_PORT = int(os.getenv("QDRANT_PORT")) # 개발용, 배포용 포트 번호 환경변수 확인

CHATBOT_COLLECTION = "chatbot-docs"
# CHATBOT_DIMENSION = 768
CHATBOT_DIMENSION = 1024
RECOMMENDATION_ITEM_COLLECTION = "recommendation-embeddings"

# embeddings = HuggingFaceEmbeddings(model_name='jhgan/ko-sroberta-multitask')
embeddings = HuggingFaceEmbeddings(model_name='intfloat/multilingual-e5-large-instruct')

qdrantClient = QdrantClient(host=QDRANT_URL, port=QDRANT_PORT)