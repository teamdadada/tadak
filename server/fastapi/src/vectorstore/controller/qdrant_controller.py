from fastapi import APIRouter
from pydantic import BaseModel
import src.vectorstore.service.qdrant_service as qdrant_service

qdrant_router = APIRouter(
    prefix="/qdrant",
    tags=["Qdrant"]
)

class FileQuery(BaseModel):
    file_name: str

@qdrant_router.post("/")
def init_collection():
    qdrant_service.init_collection()

@qdrant_router.post("/docs")
def get_docs_info(payload: FileQuery):
    return qdrant_service.get_uploaded_doc_info(payload.file_name)

@qdrant_router.delete("/")
def delete_collection(name: str):
    return qdrant_service.delete_collection(name)

@qdrant_router.get("/count")
def get_vector_count():
    return qdrant_service.count_vectors()