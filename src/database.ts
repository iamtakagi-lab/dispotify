import { PrismaClient } from '@prisma/client'

export class Database {
  public client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }
}
