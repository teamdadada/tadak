#!/bin/bash

set -e

echo "[INFO] 시스템 패키지 업데이트 및 필수 패키지 설치..."
sudo apt update && sudo apt install -y \
    python3-pip \
    python3-dev \
    build-essential \
    libnss3 \
    libgconf-2-4 \
    libxss1 \
    libappindicator1 \
    libindicator7 \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    chromium-browser \
    chromium-chromedriver \
    unzip curl wget

echo "[INFO] pip 업그레이드 및 크롤러용 Python 패키지 설치..."
pip3 install --upgrade pip

pip3 install \
    airflow \
    selenium \
    beautifulsoup4 \
    webdriver-manager \
    pymysql \
    pymongo

echo "[INFO] 환경 설치 완료"
