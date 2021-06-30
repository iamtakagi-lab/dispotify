import env from '../env'
import axios from 'axios'
import querystring from 'querystring'

import { AuthorizationCredentials } from '../typings/struct'

export default class SpotifyAuthApi {
  public url: string

  constructor() {
    this.url = 'https://accounts.spotify.com/'
  }

  get client() {
    return axios.create({
      baseURL: this.url,
      timeout: 1000 * 60,
    })
  }

  async token({
    code,
    clientId,
    clientSecret,
  }: AuthorizationCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .post(
          'api/token',
          querystring.stringify({
            grant_type: 'authorization_code',
            redirect_uri: env.SPOTIFY_REDIRECT_URI,
            code: code,
          }),
          {
            headers: {
              Authorization:
                'Basic ' +
                new Buffer(clientId + ':' + clientSecret).toString('base64'),
              Accept: '*/*',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
