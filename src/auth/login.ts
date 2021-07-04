import { Context } from 'koa'
import { stringify } from 'querystring'
import env from '../env'

export const login = async (ctx: Context) => {
  if (ctx.cookies.get('accessToken')) {
    return ctx.redirect(env.BASE_URL)
  }

  var scope = 'user-read-currently-playing'
  ctx.redirect(
    'https://accounts.spotify.com/authorize?' +
      stringify({
        response_type: 'code',
        client_id: env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
      })
  )
}
