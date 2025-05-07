from typing import List
from fastapi import APIRouter, UploadFile, File, Form
import src.chatbot.service.chatbot_service as chatbot_service

chatbot_router = APIRouter(
    prefix="/chat",
    tags=["Chatbot"]
)

@chatbot_router.post("/docs")
async def upload_files (files: List[UploadFile] = File(...), file_detail: str = Form(...)):
    response = await chatbot_service.upload_files(files, file_detail)
    return response

@chatbot_router.post("")
def get_response(user_id: int, query: str):
    return chatbot_service.get_response(user_id, query)

@chatbot_router.get("")
def get_history(user_id: int):
    memory = chatbot_service.get_memory(str(user_id))
    return memory.chat_memory.messages
