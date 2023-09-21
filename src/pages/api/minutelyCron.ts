import db from "db"
import { CronJob } from "quirrel/blitz"

export default CronJob(
  "api/minutelyCron", // the path of this API route
  "*/3 * * * *", // cron schedule (see https://crontab.guru)
  async () => {
    console.log("A 3-min has begun!")
    const resp = await db.auction.findMany({
      where: {
        endsAt: {
          lte: new Date(),
        },
      },
    })

    resp.forEach(async (n) => {
      await db.auction.update({
        where: {
          id: n.id,
        },
        data: {
          isEnded: 1,
        },
      })
    })
  }
)
