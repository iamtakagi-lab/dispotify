import { Context } from 'koa'
import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'

export const logout = async (ctx: Context) => {
  ctx.cookies.set('accessToken', null)
  ctx.cookies.set('refreshToken')
  ctx.redirect(env.BASE_URL)
}
