import { Ctx } from "blitz"
import db from "db"

interface ParamsType {
  id: number
}

export default async function getAuction(params: ParamsType, { session }: Ctx) {
  const auction = await db.auction.findFirst({
    where: {
      id: params.id,
    },
  })

  return auction
}
