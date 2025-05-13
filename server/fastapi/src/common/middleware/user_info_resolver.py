from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class UserResolverMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        user_id = request.headers.get("X-User-Id")
        user_nickname = request.headers.get("X-User-Nickname")
        user_role = request.headers.get("X-User-Type")

        request.state.user = {
            "id": user_id,
            "nickname": user_nickname,
            "role": user_role
        }

        response = await call_next(request)
        return response