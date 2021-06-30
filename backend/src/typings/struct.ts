import { User } from '@prisma/client'

export type Env = { 
  HOST: string
  PORT: string
  BASE_URL: string
  FRONTEND_BASE_URL: string
  SPOTIFY_REDIRECT_URI: string
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  PLAYER_WATCH_INTERVAL: number
}

export type Player = {
  user: User
  track: SpotifyApi.CurrentlyPlayingResponse
}

export type UserUpdateRequestBody = {
  webhookUrls?: string
  messageFormat?: string
}

export type AuthorizationCredentials = {
  code: string
  clientId: string
  clientSecret: string
}
