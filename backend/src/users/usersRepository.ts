import { Database } from '@/database'
import { User } from '@prisma/client'
import { db } from '../main'
import SpotifyWebApi from 'spotify-web-api-node'

export class UsersRepository {
  private db: Database

  constructor() {
    this.db = db
  }

  async getAll(): Promise<Array<User>> {
    return new Promise(async (resolve, reject) => {
      resolve(await this.db.client.user.findMany())
    })
  }

  async findByUserId(userId: number): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.findFirst({
        where: {
          userId: userId,
        },
      })
      resolve(user)
    })
  }

  async findBySpotifyId(spotifyId: string): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.findFirst({
        where: {
          spotifyId: spotifyId,
        },
      })
      resolve(user)
    })
  }

  async findByAccessToken(accessToken: string): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.findFirst({
        where: {
          accessToken: accessToken,
        },
      })
      resolve(user)
    })
  }

  async create({ spotifyId, accessToken, refreshToken }: any): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.create({
        data: {
          spotifyId: spotifyId,
          accessToken: accessToken,
          refreshToken: refreshToken,
          messageFormat: '🎧 %name% is playing %track_url%',
          webhookUrls: [],
        },
      })
      resolve(user)
    })
  }

  async update(
    userId: number,
    webhookUrls?: string[],
    messageFormat?: string
  ): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      const find = await this.findByUserId(userId)
      if (find != null) {
        const user = await this.db.client.user.update({
          where: {
            userId: userId,
          },
          data: {
            webhookUrls: webhookUrls ? webhookUrls : find.webhookUrls,
            messageFormat: messageFormat ? messageFormat : find.messageFormat,
          },
        })
        resolve(user ? true : false)
      } else {
        resolve(false)
      }
    })
  }

  async updateAccessToken(
    userId: number,
    accessToken: string
  ): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.update({
        where: {
          userId: userId,
        },
        data: {
          accessToken: accessToken,
        },
      })
      resolve(user ? true : false)
    })
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.update({
        where: {
          userId: userId,
        },
        data: {
          refreshToken: refreshToken,
        },
      })
      resolve(user ? true : false)
    })
  }

  async delete(userId: number): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.db.client.user.delete({
        where: {
          userId: userId,
        },
      })
      resolve(user ? true : false)
    })
  }
}
