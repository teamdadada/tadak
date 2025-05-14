from fastapi import FastAPI
from src.chatbot.controller.chatbot_controller import chatbot_router
from src.common.middleware.user_info_resolver import UserResolverMiddleware
from src.vectorstore.controller.qdrant_controller import qdrant_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]

# 미들웨어 등록
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,               # 허용할 origin 목록
    allow_credentials=True,              # 쿠키, 인증 헤더 등 허용할지
    allow_methods=["*"],                 # 허용할 HTTP 메서드
    allow_headers=["*"],                 # 허용할 헤더
)
app.include_router(chatbot_router)
app.include_router(qdrant_router)
app.add_middleware(UserResolverMiddleware)