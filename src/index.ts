import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import requestId from 'koa-requestid'
import next from 'next'

import router, { nextRoute, nextSsrCache } from './routes'
import env from './env'

import { Database } from './database'
import { UsersRepository } from './users/repository'
import player from './player'
import SpotifyAuthApi from './auth/auth'

export const auth = new SpotifyAuthApi()
export const db = new Database()
export const usersRepo = new UsersRepository()

const dev = env.NODE_ENV !== 'production'
const nextApp = next({
  dev,
  dir: './src/client',
})

const handle = nextApp.getRequestHandler()

const app = new Koa()

nextRoute(handle)
nextSsrCache(nextApp)

!dev ? app.use(logger()) : ''
app.use(bodyParser())
app.use(requestId())
app.use(helmet())
app.use(cors())

nextApp.prepare().then(() => {
  app.use(router.routes())
  app.use(router.allowedMethods())
  ;(async () => {
    app.listen(env.PORT, env.HOST, () => {
      console.info(
        `API server listening on ${env.HOST}:${env.PORT}, in ${env.NODE_ENV}`
      )
    })
  })()
})

app.on('error', (err) =>
  console.error(`Unhandled exception occured. message: ${err.message}`)
)
;(async () => {
  player()
})()

export default app
