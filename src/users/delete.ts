import { Context } from 'koa'
import { usersRepo } from '..'

export const deleteUser = async (ctx: Context) => {
  const accessToken = ctx.cookies.get('accessToken')
  if (!accessToken) return (ctx.status = 403)
  const user = await usersRepo.findByAccessToken(accessToken)
  if (user === null) return (ctx.status = 404)
  usersRepo.delete(user.userId).then((result) => {
    if (result) {
      ctx.cookies.set('accessToken', null)
      ctx.cookies.set('refreshToken', null)
    }
    return (ctx.body = { success: result })
  })
}
