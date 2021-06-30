import env from '../env'
import { UpdateUserRequestBody } from '@/typings/struct'
import { Request, Response, NextFunction } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import { usersRepo } from '../main'

export const list = async (req: Request, res: Response, next: NextFunction) => {
  res.json(JSON.stringify(await usersRepo.getAll()))
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken

  if(!accessToken) {
    return res.status(403)
  }

  const user = await usersRepo.findByAccessToken(accessToken)

  const spotify = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI,
    accessToken: accessToken
  })

  const spotifyUser = await (await spotify.getMe()).body
  res.json({
    user: user,
    spotifyUser: spotifyUser,
  })
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken

  if(!accessToken) {
    return res.status(403)
  }

  const user = await usersRepo.findByAccessToken(accessToken)

  if (user === null) return res.status(404)

  let { webhookUrls, messageFormat }: UpdateUserRequestBody = req.body

  if (!webhookUrls || !messageFormat) {
    return res.status(500)
  }

  const splitWebhookUrls: string[] = req.body.webhookUrls.split(',')

  splitWebhookUrls.forEach((url: string) => {
    if (!url.startsWith('https://discord.com/api/webhooks/')) {
      return res.status(500)
    }
  })

  if (messageFormat === null || !messageFormat.length) {
    return res.status(500)
  }

  usersRepo.update(
    user.userId,
    splitWebhookUrls,
    messageFormat
  ).then((result) => {
    res.json({ success: result })
  })
  
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.debug(req.cookies.accessToken)
  const user = await usersRepo.findByAccessToken(req.cookies.accessToken)
  if(user === null) return res.status(404)
  usersRepo.delete(user.userId).then((result) => {
    if(result) {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
    }
    return res.json({ success: result })
  })
}

export const playing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies
  const spotify = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI,
    accessToken: accessToken,
    refreshToken: refreshToken,
  })
  const user = await usersRepo.findByAccessToken(accessToken)
  if(user === null) return res.status(404)
  spotify
    .getMyCurrentPlayingTrack()
    .then((data) => {
      return data.body
    })
    .catch(async (e) => {
      const ref = (await spotify.refreshAccessToken()).body
      const accessToken = ref.access_token
      const refreshToken = ref.refresh_token
      usersRepo.updateAccessToken(user.userId, accessToken)
      spotify.setAccessToken(accessToken)
      if (refreshToken) {
        usersRepo.updateRefreshToken(user.userId, refreshToken)
        spotify.setRefreshToken(refreshToken)
      }
      spotify.getMyCurrentPlayingTrack().then((data) => {
        return data.body
      })
    }).then((data) => {
      res.json(data)
  })
}

 /**
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(403)
  }
  if (authHeader.split(' ')[0] != 'Bearer') {
    return res.status(403)
  }
  const accessToken = Buffer.from(authHeader.split(' ')[1], 'base64').toString()
  */