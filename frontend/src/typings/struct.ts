export type User = {
    userId: number
    spotifyId: string
    accessToken: string
    refreshToken: string
    webhookUrls: string[]
    messageFormat: string
}

export type Me = {
    user?: User
    spotifyUser?: any
}

export type Env = {
    HOST: string
    PORT: string
    BACKEND_BASE_URL: string
}

export type UserDeleteResponse = {
    success: boolean
}

export type UsersStatus = {
    usersCount: number
}