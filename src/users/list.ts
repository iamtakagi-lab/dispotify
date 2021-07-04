import { Context } from 'koa'
import { usersRepo } from '..'

export const list = async (ctx: Context) => {
  ctx.body = JSON.stringify(await usersRepo.getAll())
}
