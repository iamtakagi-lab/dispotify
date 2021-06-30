import { User } from '@prisma/client'
import { usersRepo } from './main'
import { Player } from './typings/struct'
import SpotifyWebApi from 'spotify-web-api-node'
import env from './env'
import Discord, { MessageEmbed, WebhookClient } from 'discord.js'

export default async () => {
  const storedData: Player[] = []
  const watch = () => {
    usersRepo.getAll().then((users: User[]) => {
      users.map(async (user: User) => {
        const spotify = new SpotifyWebApi({
          clientId: env.SPOTIFY_CLIENT_ID,
          clientSecret: env.SPOTIFY_CLIENT_SECRET,
          redirectUri: env.SPOTIFY_REDIRECT_URI,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        })
        spotify
          .getMe()
          .then((data) => {
            return data.body
          })
          .catch(async (e) => {
            const ref = (await spotify.refreshAccessToken()).body
            const accessToken = ref.access_token
            const refreshToken = ref.refresh_token
            await usersRepo.updateAccessToken(user.userId, accessToken)
            spotify.setAccessToken(accessToken)
            if (refreshToken) {
              await usersRepo.updateRefreshToken(user.userId, refreshToken)
              spotify.setRefreshToken(refreshToken)
            }
            const me = await (await spotify.getMe()).body
            return me
          })
          .then(async (me) => {
            const storedItem = storedData.find(
              (item: any) => item.user.userId === user.userId
            )
            const currentTrack = (await spotify.getMyCurrentPlayingTrack()).body
            if (currentTrack && currentTrack.is_playing) {
              //再生開始したとき
              if (
                !storedItem ||
                !storedItem.track ||
                storedItem.track.item?.id != currentTrack.item?.id
              ) {
                const currentItem = currentTrack.item
                if (currentItem) {
                  user.webhookUrls.forEach(async (url) => {
                    const splitUrl = url.split('/')
                    const webhook = new Discord.WebhookClient(
                      splitUrl[5],
                      splitUrl[6]
                    )
                    const format = user.messageFormat
                    const display_name = me.display_name
                    const track_url = `https://open.spotify.com/track/${
                      currentItem.uri.split(':')[2]
                    }`
                    const message = format
                      .replace('%name%', display_name || me.id)
                      .replace('%track_url%', track_url)
                    await webhook.send(message)
                    /** 
                    if(!a){
                      const urls = user.webhookUrls.filter((v) => v != url)
                      await usersRepo.update(user.userId, urls)
                    }*/
                  })
                  if (!storedItem) {
                    storedData.push({ user: user, track: currentTrack })
                  } else {
                    storedItem.track = currentTrack
                  }
                }
              }
            }
          })
      })
    })
  }
  setInterval(watch, env.PLAYER_WATCH_INTERVAL)
}
