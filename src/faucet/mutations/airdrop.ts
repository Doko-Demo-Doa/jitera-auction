import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Ctx, NotFoundError } from "blitz"
import { z } from "zod"

export default async function airdrop(params: any, ctx: Ctx) {
  if (!ctx.session.userId) throw new NotFoundError()
  const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
  if (!user) throw new NotFoundError()

  const u = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      balance: user.balance <= 50000 ? user.balance + 2000 : user.balance,
    },
  })

  return u
}
