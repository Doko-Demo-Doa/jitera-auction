import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AuctionItemSchema } from "../schemas"

export default resolver.pipe(resolver.zod(AuctionItemSchema), async (params, ctx) => {
  const updated = await db.auction.update({
    where: {
      id: params.id,
    },
    data: params,
  })

  return updated
})
