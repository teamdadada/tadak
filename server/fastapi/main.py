from fastapi import FastAPI
from src.chatbot.controller.chatbot_controller import chatbot_router
from src.vectorstore.controller.qdrant_controller import qdrant_router

app = FastAPI()

app.include_router(chatbot_router)
app.include_router(qdrant_router)