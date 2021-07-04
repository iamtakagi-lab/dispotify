import { User } from '@prisma/client'
import axios from 'axios'
import env from '../../env'
import { UserDeleteResponse, Me, UsersCount } from '../../typings/struct'

export class Client {
  public baseUrl: string

  constructor() {
    this.baseUrl = env.BASE_URL
  }

  get client() {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 1000 * 60,
      withCredentials: true,
    })
  }

  async getUsersCount() {
    const { data } = await this.client.get<UsersCount>('users/count')
    return data
  }

  async getMe() {
    const { data } = await this.client.get<Me>('users/me')
    return data
  }

  async getPlaying() {
    const { data } = await this.client.get<any>('users/playing')
    return data
  }

  async updateUser(webhookUrls: string, messageFormat: string) {
    const { data } = await this.client.put<User>('users', {
      webhookUrls: webhookUrls,
      messageFormat: messageFormat,
    })
    return data
  }

  async deleteUser() {
    const { data } = await this.client.delete<UserDeleteResponse>('users')
    return data
  }
}
