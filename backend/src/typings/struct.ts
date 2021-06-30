import { User } from '@prisma/client'

export type Env = {
  BASE_URI: string
  FRONTEND_BASE_URI: string
  SPOTIFY_REDIRECT_URI: string
  PORT: string
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  PLAYER_WATCH_INTERVAL: number
}

export type Player = {
  user: User
  track: SpotifyApi.CurrentlyPlayingResponse
}

export type UpdateUserRequestBody = {
  webhookUrls?: string
  messageFormat?: string
}

export type AuthorizationCredentials = {
  code: string
  clientId: string
  clientSecret: string
}
