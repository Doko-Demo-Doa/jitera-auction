import { z } from "zod"

export const auctionItem = z.object({
  name: z.string().min(2),
  description: z.string().max(1024),
  startingPrice: z.number().min(1).nonnegative(),
  priceStep: z.number().min(1).nonnegative(),
  currency: z.string(),
  isEnded: z.boolean(),
  startTime: z.date().readonly(),
  endTime: z.date(),
})
