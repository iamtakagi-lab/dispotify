import { Env } from './typings/struct'

export default {
  HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
  PORT: process.env.PORT ? process.env.PORT : '3001',
  BASE_URL: process.env.BASE_URL ? process.env.BASE_URL : '/api',
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL
    ? process.env.FRONTEND_BASE_URL
    : 'http://localhost:3000',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
    ? process.env.SPOTIFY_REDIRECT_URI
    : 'http://localhost:3001/api/auth/callback',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID
    ? process.env.SPOTIFY_CLIENT_ID
    : '873ff81b3d4f4711adc2f56e54e039c6',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
    ? process.env.SPOTIFY_CLIENT_SECRET
    : '5f005d4cbc1f416680edee2d4070f8a3',
  PLAYER_WATCH_INTERVAL: process.env.PLAYER_WATCH_INTERVAL
    ? process.env.PLAYER_WATCH_INTERVAL
    : 25000,
} as Env