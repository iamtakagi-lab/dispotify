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
    BACKEND_BASE_URI: string
    PORT: string
}