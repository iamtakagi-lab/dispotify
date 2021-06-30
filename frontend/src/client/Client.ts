import axios from "axios";
import env from "../common/env";
import { Me } from "../typings/struct";

export class Client {
  public url: string;

  constructor() {
    this.url = env.BACKEND_BASE_URI
  }

  get client() {
    return axios.create({
      baseURL: this.url,
      timeout: 1000 * 30,
      withCredentials: true
    });
  }

  async getMe() {
    const {data} = await this.client.get<Me>("/users/me")
    return data
  }

  async getPlaying() {
    const {data} = await this.client.get("/users/playing")
    return data
  }

  async updateUser(webhookUrls: string, messageFormat: string) {
    const {data} = await this.client.put("/users", {
      webhookUrls: webhookUrls,
      messageFormat: messageFormat
    })
    return data
  }

  async deleteUser() {
    const {data} = await this.client.delete<any>("/users")
    return data
  }

  
}
