export type Me = {
    user: {
        userId: number
        spotifyId: string
        accessToken: string
        refreshToken: string
        webhookUrls: string[]
        messageFormat: string
    }
    spotifyUser: any
}

export type Env = {
    HOST: string
    PORT: string
    BACKEND_BASE_URI: string
}