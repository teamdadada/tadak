# 1단계: Build Stage
FROM gradle:8.5-jdk17 AS builder
WORKDIR /app
COPY build.gradle.kts settings.gradle.kts gradle.properties ./
COPY gradle ./gradle
RUN gradle dependencies --no-daemon || return 0
COPY . .
RUN gradle clean installDist --no-daemon

# 2단계: Runtime Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/install/tadak_auth .
CMD ["sh", "-c", "./bin/tadak_auth"]