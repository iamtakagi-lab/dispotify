import { Env } from "../typings/struct";

export default {
    HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
    PORT: process.env.PORT ? process.env.PORT : '3000',
    BACKEND_BASE_URI: process.env.BACKEND_URI ? process.env.BACKEND_URI : "http://localhost:3001/api/",
} as Env
  