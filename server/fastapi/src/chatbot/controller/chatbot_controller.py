import json
from http.client import HTTPException
from typing import List
from starlette.requests import Request
from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
import src.chatbot.service.chatbot_service as chatbot_service
from src.chatbot.util import mongo_embedding, embedding_util

chatbot_router = APIRouter(
    prefix="/chat",
    tags=["Chatbot"]
)

class UserQuery(BaseModel):
    user_id: int
    query: str

@chatbot_router.post("/docs")
async def upload_files (files: List[UploadFile] = File(...), file_detail: str = Form(...)):
    response = await chatbot_service.upload_files(files, file_detail)
    return response

@chatbot_router.post("")
def get_response(user_query: UserQuery):
    return chatbot_service.get_response(user_query.user_id, user_query.query)

@chatbot_router.get("")
def get_history(request: Request):
    user_id = request.state.user["id"]
    memory = chatbot_service.get_memory(str(user_id))
    response = chatbot_service.format_history(memory.chat_memory.messages)
    return response

@chatbot_router.post("/embed/{category}")
async def embed_product_json(category: str, file: UploadFile = File(...)):
    try:
        contents = await file.read()
        data = json.loads(contents.decode("utf-8"))
    except Exception:
        raise HTTPException(status_code=400, detail="유효하지 않은 JSON 파일입니다")

    docs = mongo_embedding.load_json_documents_from_data(data, category)
    splits = embedding_util.get_docs_split_list(docs)
    embedding_util.embed_documents(splits)

    return {
        "status": "success",
        "chunks": len(splits),
        "category": category
    }