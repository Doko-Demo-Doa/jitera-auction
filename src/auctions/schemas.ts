import { z } from "zod"

export const AuctionItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  description: z.string().max(1024),
  startingPrice: z.number().min(1).nonnegative(),
  priceStep: z.number().min(1).nonnegative(),
  currency: z.string(),
  isEnded: z.number(),
  startsAt: z.date().readonly(),
  endsAt: z.date(),
})

export type AuctionItemSchemaType = z.infer<typeof AuctionItemSchema>
