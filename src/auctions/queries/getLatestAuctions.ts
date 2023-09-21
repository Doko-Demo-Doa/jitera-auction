import { Ctx } from "blitz"
import db from "db"

export default async function getLatestAuctions(_ = null, { session }: Ctx) {
  const auctions = await db.auction.findMany({
    take: 10,
  })

  const highestBidder = await db.userAuction.findFirst({
    where: {
      auctionId: {
        in: auctions.map((auction) => auction.id),
      },
    },
    orderBy: {
      setPrice: "desc",
    },
  })

  return auctions.map((n) => ({ ...n, highest: highestBidder }))
}
