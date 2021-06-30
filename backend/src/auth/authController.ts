import e, { Request, Response, NextFunction } from 'express'
import env from '../env'
import { stringify } from 'querystring'
import { auth, usersRepo } from '../main'
import SpotifyWebApi from 'spotify-web-api-node'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.accessToken) {
    return res.redirect(env.FRONTEND_BASE_URL)
  }

  var scope =
    'user-read-currently-playing'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      stringify({
        response_type: 'code',
        client_id: env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
      })
  )
}

export const callback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { code } = req.query
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
        res.cookie('accessToken', data.access_token, { maxAge: 1000 * 3600 })
        res.cookie('refreshToken', data.refresh_token)
        res.redirect(env.FRONTEND_BASE_URL)
      })
      .catch((e: any) => {
        console.error('Error: ', e, e.stack)
        res.status(e.status || 500)
        res.json('Internal server error')
      })
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.redirect(env.FRONTEND_BASE_URL)
}
