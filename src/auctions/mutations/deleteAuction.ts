import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AuctionItemSchema } from "../schemas"

export default resolver.pipe(resolver.zod(AuctionItemSchema), async (params, ctx) => {
  const auctionItem = await db.auction.delete({
    where: {
      id: params.id,
    },
  })

  return auctionItem
})
