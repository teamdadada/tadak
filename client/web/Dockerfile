# 빌드 단계
FROM node:22-alpine AS builder
WORKDIR /app

ARG DEPLOY_ENV

# 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 환경변수 파일 복사 
COPY .env.${DEPLOY_ENV} .env.${DEPLOY_ENV}

# 소스 복사
COPY . .

# 빌드
RUN npm run build -- --mode ${DEPLOY_ENV}

# 런타임 단계
FROM nginx:alpine

# Nginx 설정 복사
COPY default.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 포트 80 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
