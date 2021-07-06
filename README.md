# dispotify
🎧 Spotify to Discord notifier / Spotifyで再生中の音楽をDiscordに通知する Web アプリ


[![GitHub release (latest by date)](https://img.shields.io/github/v/release/iamtakagi/dispotify)](https://github.com/iamtakagi/dispotify/releases)
[![Deploy](https://github.com/iamtakagi/dispotify/actions/workflows/deploy.yml/badge.svg)](https://github.com/iamtakagi/dispotify/actions/workflows/deploy.yml)
[![license](https://img.shields.io/github/license/iamtakagi/dispotify)](https://github.com/iamtakagi/dispotify/blob/master/LICENSE)
[![issues](https://img.shields.io/github/issues/iamtakagi/dispotify)](https://github.com/iamtakagi/dispotify/issues)
[![pull requests](https://img.shields.io/github/issues-pr/iamtakagi/dispotify)](https://github.com/iamtakagi/dispotify/pulls)

## Installation
```console
touch docker-compose.yml
# Database Url 設定
touch backend/prisma/.env
docker-compose up -d --build
```

`docker-compose.yml`
```yml
version: '3.8'

services:
  nginx:
    build: nginx
    ports:
        - 80:80
    environment:
        TZ: Asia/Tokyo
    restart: always

  postgres:
    container_name: postgres
    image: postgres
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: dispotify
    restart: always
    volumes:
      - ./db:/docker-entrypoint-initdb.d
      - postgres-data:/var/lib/postgresql/data
    ports:
      - 5432:5432

  backend:
    container_name: dispotify_backend
    image: iamtakagi/dispotify_backend:latest
    environment:
      TZ: Asia/Tokyo
      HOST: 0.0.0.0
      PORT: 3001
      BASE_URI: /api
      FRONTEND_BASE_URL: https://dispotify.iamtakagi.net
      SPOTIFY_REDIRECT_URL: https://dispotify.iamtakagi.net/api/auth/callback
      # 入力必須
      SPOTIFY_CLIENT_ID: xxx
      SPOTIFY_CLIENT_SECRET: xxx
      # 再生中の音楽を検知するタスクのインターバル: 25秒以上を推奨 (それ以下にすると SpotifyAPI のRateLimit に引っ掛かり Too Many Request 429 の応答エラーが発生する可能性有)
      PLAYER_WATCH_INTERVAL: 25000
    restart: always
    ports:
      - 3001:3001
    links: 
      - postgres
    depends_on:
      - postgres

  frontend:
    container_name: dispotify_frontend
    image: iamtakagi/dispotify_frontend:latest
    environment:
      TZ: Asia/Tokyo
      HOST: 0.0.0.0
      PORT: 3000
      BACKEND_BASE_URL: https://dispotify.iamtakagi.net/api/
    restart: always
    ports:
      - 3000:3000
    links: 
      - backend
    depends_on: 
      - backend

volumes:
    postgres-data:
      driver: local
```

## Devlopment
`docker-compose.yml`
```yml
version: '3.8'

services:
  nginx:
    build: nginx
    ports:
        - 80:80
    environment:
        TZ: Asia/Tokyo
    restart: always

  postgres:
    container_name: postgres
    image: postgres
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: dispotify
    restart: always
    volumes:
      - ./db:/docker-entrypoint-initdb.d
      - postgres-data:/var/lib/postgresql/data
    ports:
      - 5432:5432

  backend:
    container_name: dispotify_backend
    build: backend
    environment:
      TZ: Asia/Tokyo
      HOST: 0.0.0.0
      PORT: 3001
      BASE_URI: /api
      FRONTEND_BASE_URI: http://localhost:3000
      SPOTIFY_REDIRECT_URI: http://localhost:3001/api/auth/callback
      # 入力必須
      SPOTIFY_CLIENT_ID: xxx
      SPOTIFY_CLIENT_SECRET: xxx
      # 再生中の音楽を検知するタスクのインターバル: 25秒以上を推奨 (それ以下にすると SpotifyAPI のRateLimit に引っ掛かり Too Many Request 429 の応答エラーが発生する可能性有)
      PLAYER_WATCH_INTERVAL: 25000
    restart: always
    ports:
      - 3001:3001
    links:
      - postgres
    depends_on:
      - postgres

  frontend:
    container_name: dispotify_frontend
    build: frontend
    environment:
      TZ: Asia/Tokyo
      HOST: 0.0.0.0
      PORT: 3000
      BACKEND_BASE_URI: http://localhost:3001/api
    restart: always
    ports:
      - 3000:3000
    links: 
      - backend
    depends_on: 
      - backend

volumes:
    postgres-data:
      driver: local
```

# LICENSE
iamtakagi/dispotify is provided under the MIT license.
