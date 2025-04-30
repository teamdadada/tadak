from typing import List
from fastapi import APIRouter, UploadFile, File, Form
import src.chatbot.service.chatbot_service as chatbot_service

chatbot_router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)

@chatbot_router.post("/docs")
def upload_files (files: List[UploadFile] = File(...), file_detail: str = Form(...)):
    response = chatbot_service.upload_files(files, file_detail)
    return response
