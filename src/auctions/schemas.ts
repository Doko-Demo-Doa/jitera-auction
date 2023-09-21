import { z } from "zod"
import dayjs from "dayjs"

export const AuctionItemSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(2),
    description: z.string().min(1).max(1024),
    startingPrice: z.number().min(1).nonnegative(),
    priceStep: z.number().min(0.1).nonnegative(),
    currency: z.string(),
    isEnded: z.number(),
    startsAt: z
      .date()
      .optional()
      .refine((d) => {
        const now = dayjs()
        const start = dayjs(d)
        if (now.isBefore(start)) {
          return true
        }

        return false
      }, "The start date should be now or in the future. Leave blank if you want to start immediately"),
    endsAt: z.date().refine((d) => {
      const now = dayjs()
      const start = dayjs(d)
      if (now.isBefore(start)) {
        return true
      }

      return false
    }, "The end date should be in the future"),
  })
  .refine(
    (data) => {
      const start = dayjs(data.startsAt)
      const end = dayjs(data.endsAt)

      console.log("ss", start.format("YYYY-MM-DD HH:mm"), end.format("YYYY-MM-DD HH:mm"))
      if (end.isBefore(start) || end.isSame(start)) {
        console.log("X1")
        return false
      }

      if (end.diff(start, "day") < 1) {
        return false
      }

      return true
    },
    {
      message: "End date should be after start date at least 1 day",
      path: ["endsAt"],
    }
  )

export type AuctionItemSchemaType = z.infer<typeof AuctionItemSchema>
