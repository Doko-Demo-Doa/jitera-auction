import { resolver } from "@blitzjs/rpc"
import db from "db"
import { BidAuctionSchema } from "../schemas"
import { NotFoundError } from "blitz"

export default resolver.pipe(
  resolver.zod(BidAuctionSchema),
  resolver.authorize(),
  async (params, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new NotFoundError()

    const auctionItem = await db.userAuction.create({
      data: {
        auctionId: params.auctionId,
        userId: user.id,
        setPrice: params.setPrice,
      },
    })

    return auctionItem
  }
)
