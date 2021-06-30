import axios from "axios";
import env from "../common/env";
import { UserDeleteResponse, Me, User, UsersStatus } from "../typings/struct";

export class Client {
  public url: string;

  constructor() {
    this.url = env.BACKEND_BASE_URL
  }

  get client() {
    return axios.create({
      baseURL: this.url,
      timeout: 1000 * 60,
      withCredentials: true
    });
  }

  async getUsersStatus() {
    const {data} = await this.client.get<UsersStatus>("users/status")
    return data
  }

  async getMe() {
    const {data} = await this.client.get<Me>("users/me")
    return data
  }

  async getPlaying() {
    const {data} = await this.client.get<any>("users/playing")
    return data
  }

  async updateUser(webhookUrls: string, messageFormat: string) {
    const {data} = await this.client.put<User>("users", {
      webhookUrls: webhookUrls,
      messageFormat: messageFormat
    })
    return data
  }

  async deleteUser() {
    const {data} = await this.client.delete<UserDeleteResponse>("users")
    return data
  }

  
}
