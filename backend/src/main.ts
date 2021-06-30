import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import env from './env'
import router from './router'
import { Database } from './database'
import { UsersRepository } from './users/usersRepository'
import player from './player'

import SpotifyAuthApi from './api/SpotifyAuth'

export const auth = new SpotifyAuthApi()
export const db = new Database()
export const usersRepo = new UsersRepository()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({ credentials: true, origin: true }))
app.use(env.BASE_URL, router)
app.listen(env.PORT)
;(async () => {
  player()
})()
