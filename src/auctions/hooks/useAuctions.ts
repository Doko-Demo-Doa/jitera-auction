import { useMutation, useQuery } from "@blitzjs/rpc"
import getLatestAuctions from "src/auctions/queries/getLatestAuctions"

export const useLatestAuctions = () => {
  const [auctions] = useQuery(getLatestAuctions, null)
  return auctions
}
