import { Env } from './typings/struct'

export default {
  BASE_URI: process.env.BASE_URI ? process.env.BASE_URI : '/api',
  FRONTEND_BASE_URI: process.env.FRONTEND_BASE_URI
    ? process.env.FRONTEND_BASE_URI
    : 'http://localhost:3000',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
    ? process.env.SPOTIFY_REDIRECT_URI
    : 'http://localhost:3001/api/auth/callback',
  PORT: process.env.PORT ? process.env.PORT : '3001',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID
    ? process.env.SPOTIFY_CLIENT_ID
    : '2e969d0e0f164bb1afeb212c94dc0bd2',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
    ? process.env.SPOTIFY_CLIENT_SECRET
    : '33d9a770d73945ba8bca814561114000',
  PLAYER_WATCH_INTERVAL: process.env.PLAYER_WATCH_INTERVAL
    ? process.env.PLAYER_WATCH_INTERVAL
    : 25000,
} as Env
