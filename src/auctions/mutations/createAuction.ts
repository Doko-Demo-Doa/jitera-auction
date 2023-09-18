import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AuctionItemSchema } from "../schemas"

export default resolver.pipe(resolver.zod(AuctionItemSchema), async (params, ctx) => {
  const auctionItem = await db.auction.create({
    data: {
      description: params.description,
      endsAt: params.endsAt,
      startsAt: params.startsAt,
      startingPrice: params.startingPrice,
      priceStep: params.priceStep,
      name: params.name,
      currency: params.currency,
      isEnded: params.isEnded,
    },
  })

  return auctionItem
})
