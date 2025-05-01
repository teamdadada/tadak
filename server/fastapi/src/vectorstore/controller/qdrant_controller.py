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

@qdrant_router.get("/docs")
def get_docs_info(payload: FileQuery):
    qdrant_service.get_uploaded_doc_info(FileQuery.file_name)

@qdrant_router.delete("/")
def delete_collection(name: str):
    qdrant_service.delete_collection(name)