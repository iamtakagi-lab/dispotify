export default {
    NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
    PORT: process.env.PORT ? Number(process.env.PORT) : Number(3000),
    BASE_URL: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI ? process.env.SPOTIFY_REDIRECT_URI : 'http://localhost:3000/auth/callback',
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID ? process.env.SPOTIFY_CLIENT_ID : 'xxx',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ? process.env.SPOTIFY_CLIENT_SECRET : 'xxx',
    PLAYER_WATCH_INTERVAL: process.env.PLAYER_WATCH_INTERVAL ? Number(process.env.PLAYER_WATCH_INTERVAL) : Number(25000),
}
