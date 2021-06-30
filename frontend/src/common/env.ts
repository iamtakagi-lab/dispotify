import { Env } from "../typings/struct";

export default {
    HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
    PORT: process.env.PORT ? process.env.PORT : '3000',
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL ? process.env.BACKEND_BASE_URL : "https://dispotify.iamtakagi.net/api"
} as Env