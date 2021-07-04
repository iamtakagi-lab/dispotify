import { Context, Next } from 'koa'
import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'
import { auth, usersRepo } from '..'

export const callback = async (ctx: Context) => {
  let { code } = ctx.query
  if (code) {
    code = code.toString()
    const clientId = env.SPOTIFY_CLIENT_ID
    const clientSecret = env.SPOTIFY_CLIENT_SECRET
    auth
      .token({ code, clientId, clientSecret })
      .then(async (data: any) => {
        const spotify = new SpotifyWebApi({
          clientId: env.SPOTIFY_CLIENT_ID,
          clientSecret: env.SPOTIFY_CLIENT_SECRET,
          redirectUri: env.SPOTIFY_REDIRECT_URI,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        })
        const me = (await spotify.getMe()).body
        return Promise.all([me, data])
      })
      .then(async ([me, data]) => {
        let user = await usersRepo.findBySpotifyId(me.id)
        //存在しなかったら作成
        if (user === null) {
          user = await usersRepo.create({
            spotifyId: me.id,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          })
          //存在したらトークン上書き
        } else {
          await usersRepo.updateAccessToken(user.userId, data.access_token)
          await usersRepo.updateRefreshToken(user.userId, data.refresh_token)
        }
        ctx.cookies.set('accessToken', data.access_token, {
          maxAge: 1000 * 3600,
        })
        ctx.cookies.set('refreshToken', data.refresh_token)
        ctx.redirect(env.BASE_URL)
        return
      })
      .catch((e: any) => {
        console.error('Error: ', e, e.stack)
        ctx.status = e.status || 500
        ctx.body = 'Internal server error'
      })
  }
}
