import { Ctx } from "blitz"
import db from "db"

export default async function getLatestAuctions(_ = null, { session }: Ctx) {
  const auctions = await db.auction.findMany({
    take: 10,
  })

  return auctions
}
