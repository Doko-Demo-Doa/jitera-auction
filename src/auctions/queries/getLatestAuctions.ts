import { Ctx } from "blitz"
import db from "db"

export default async function getLatestAuctions(_ = null, { session }: Ctx) {
  const auctions = await db.auction.findMany({
    take: 10,
    include: {
      userAuction: {
        take: 1,
        orderBy: {
          setPrice: "desc",
        },
      },
    },
  })

  return auctions
}
