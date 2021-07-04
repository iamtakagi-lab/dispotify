import { Context } from 'koa'
import { usersRepo } from '..'

export const count = async (ctx: Context) => {
  const users = await usersRepo.getAll()
  ctx.body = { count: users.length }
}
