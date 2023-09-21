import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AuctionItemSchema } from "../schemas"
import { NotFoundError } from "blitz"

export default resolver.pipe(
  resolver.zod(AuctionItemSchema),
  resolver.authorize(),
  async (params, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new NotFoundError()

    const auctionItem = await db.auction.create({
      data: {
        description: params.description,
        endsAt: params.endsAt,
        startsAt: params.startsAt || new Date(),
        startingPrice: params.startingPrice,
        priceStep: params.priceStep,
        name: params.name,
        currency: params.currency,
        isEnded: params.isEnded,
        createdBy: {
          connect: user,
        },
      },
    })

    return auctionItem
  }
)
