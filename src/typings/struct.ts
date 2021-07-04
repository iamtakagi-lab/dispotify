import { User } from '@prisma/client'

export type Me = {
  user?: User
  spotifyUser?: any
}

export type UserDeleteResponse = {
  success: boolean
}

export type UsersCount = {
  count: number
}

export type Player = {
  user: User
  track: SpotifyApi.CurrentlyPlayingResponse
}

export type AuthorizationCredentials = {
  code: string
  clientId: string
  clientSecret: string
}
