import { Env } from "../typings/env";

export default {
    BACKEND_BASE_URI: process.env.BACKEND_URI ? process.env.BACKEND_URI : "http://localhost:3001/api/",
    PORT: process.env.PORT ? process.env.PORT : "3001",
} as Env
  