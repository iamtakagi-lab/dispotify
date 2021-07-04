import { Context } from 'koa'
import { usersRepo } from '..'

export const update = async (ctx: Context) => {
  const accessToken = ctx.cookies.get('accessToken')

  if (!accessToken) {
    return (ctx.status = 403)
  }

  const user = await usersRepo.findByAccessToken(accessToken)

  if (user === null) return (ctx.status = 404)

  let { webhookUrls, messageFormat }: any = ctx.body

  if (!webhookUrls || !messageFormat) {
    return (ctx.status = 500)
  }

  const splitWebhookUrls: string[] = webhookUrls.split(',')

  splitWebhookUrls.forEach((url: string) => {
    if (!url.startsWith('https://discord.com/api/webhooks/')) {
      return (ctx.status = 500)
    }
  })

  if (messageFormat === null || !messageFormat.length) {
    return (ctx.status = 500)
  }

  usersRepo
    .update(user.userId, splitWebhookUrls, messageFormat)
    .then((result) => {
      ctx.body = { success: result }
    })
}
