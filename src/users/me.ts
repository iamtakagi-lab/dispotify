import { Context } from 'koa'
import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'
import { usersRepo } from '..'

export const me = async (ctx: Context) => {
  const accessToken = ctx.cookies.get('accessToken')

  if (!accessToken) {
    return (ctx.status = 403)
  }

  const user = await usersRepo.findByAccessToken(accessToken)

  const spotify = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI,
    accessToken: accessToken,
  })

  const spotifyUser = await (await spotify.getMe()).body

  ctx.body = {
    user: user,
    spotifyUser: spotifyUser,
  }
}
