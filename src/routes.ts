import Router from 'koa-router'

import LRUCache from 'lru-cache'
import { NextServer } from 'next/dist/server/next'

import { callback } from './auth/callback'
import { login } from './auth/login'
import { logout } from './auth/logout'
import { count } from './users/count'
import { deleteUser } from './users/delete'
import { me } from './users/me'
import { update } from './users/update'

const router = new Router()
  .get('/auth/login', login)
  .get('/auth/callback', callback)
  .get('/auth/logout', logout)
  .get('/users/count', count)
  .get('/users/me', me)
  .put('/users', update)
  .delete('/users', deleteUser)

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
})

export const nextRoute = (handle: any) => {
  router.get('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
}

export const nextSsrCache = (nextApp: NextServer) => {
  function getCacheKey(ctx: any) {
    return ctx.url
  }

  function renderAndCache(ctx: any, pagePath: string, queryParams?: any) {
    const key = getCacheKey(ctx.req)

    if (ssrCache.has(key)) {
      console.log(`CACHE HIT: ${key}`)
      ctx.body = ssrCache.get(key)
      return Promise.resolve()
    }

    return nextApp
      .renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
      .then((html) => {
        console.log(`CACHE MISS: ${key}`)
        ssrCache.set(key, html)
        ctx.body = html
      })
      .catch((err) => {
        console.log('ERRR', err)
        return nextApp.renderError(err, ctx.req, ctx.res, pagePath, queryParams)
      })
  }

  router.get('/', (ctx) => renderAndCache(ctx, '/'))
}

export default router
