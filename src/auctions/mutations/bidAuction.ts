import { resolver } from "@blitzjs/rpc"
import db from "db"
import { NotFoundError } from "blitz"
import { BidPriceError, InvalidBidError } from "src/core/errors/CustomError"
import { BidAuctionSchema } from "src/auctions/schemas"

export default resolver.pipe(
  resolver.zod(BidAuctionSchema),
  resolver.authorize(),
  async (params, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new NotFoundError()
    const targetAuction = await db.auction.findFirst({
      where: {
        id: params.auctionId,
      },
    })
    if (!targetAuction) throw new NotFoundError()
    if (targetAuction.isEnded) throw new InvalidBidError({ message: "Auction is ended" })
    if (targetAuction.userId === user.id)
      throw new InvalidBidError({ message: "You cannot bid your own auction" })

    // An entry exist
    const myBid = await db.userAuction.findFirst({
      where: {
        auctionId: params.auctionId,
        userId: user.id,
      },
      include: {
        auction: true,
      },
    })

    const highestBidder = await db.userAuction.findFirst({
      where: {
        auctionId: params.auctionId,
        userId: {
          not: user.id,
        },
      },
      orderBy: {
        setPrice: "desc",
      },
    })

    if (myBid) {
      if (highestBidder) {
        // Highest bidder exists
        if (highestBidder.setPrice > params.setPrice + targetAuction.priceStep) {
          throw new BidPriceError({ message: "Set price is smaller than highest bidder" })
        }
        const resp = await db.userAuction.update({
          where: {
            id: myBid.id,
          },
          data: {
            setPrice: params.setPrice,
            updatedAt: new Date(),
          },
        })

        return resp
      } else {
        // No highest bidder
        console.log("Green")
        throw new BidPriceError({ message: "You cannot outbid yourself" })
      }
    } else {
      // You didn't bid yet, but there's a highest bidder
      if (highestBidder) {
        if (highestBidder.setPrice > params.setPrice + targetAuction.priceStep) {
          throw new BidPriceError({ message: "Set price is smaller than required" })
        }
        const resp = await db.userAuction.create({
          data: {
            setPrice: params.setPrice,
            auctionId: params.auctionId,
            userId: user.id,
          },
        })

        return resp
      } else {
        const resp = await db.userAuction.create({
          data: {
            setPrice: params.setPrice,
            auctionId: params.auctionId,
            userId: user.id,
          },
        })

        return resp
      }
    }
  }
)
