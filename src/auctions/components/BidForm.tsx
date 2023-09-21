import { NumberInput, Button } from "@mantine/core"
import { zodResolver, useForm } from "@mantine/form"
import { modals } from "@mantine/modals"
import { Auction, UserAuction } from "@prisma/client"
import React from "react"
import { BidAuctionSchemaType, BidAuctionSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import bidAuction from "../mutations/bidAuction"

interface Props {
  item: Auction & { userAuction: (UserAuction | null)[] }
  onSuccess?: () => void
}

const BidForm: React.FC<Props> = ({ item, onSuccess }) => {
  const highestBidder = item.userAuction?.[0]
  const min = highestBidder ? highestBidder.setPrice : item.startingPrice + item.priceStep
  const [bidAuctionMutation] = useMutation(bidAuction)

  const form = useForm<BidAuctionSchemaType>({
    validate: zodResolver(BidAuctionSchema),
    initialValues: {
      auctionId: item.id,
      setPrice: min,
    },
  })

  async function handleSubmit(values: BidAuctionSchemaType) {
    try {
      const resp = await bidAuctionMutation(values)
      console.log(resp)
      onSuccess?.()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <NumberInput
        name="setPrice"
        description={`Minimum price is ${min} ${item.currency}`}
        label=""
        withAsterisk
        min={min}
        placeholder="Price"
        mb="sm"
        data-autofocus
        {...form.getInputProps("setPrice")}
      />
      <Button
        fullWidth
        color="violet"
        onClick={() => modals.closeAll()}
        mt="md"
        type="submit"
        disabled={form.values.setPrice < min}
      >
        Submit
      </Button>
    </form>
  )
}

export default BidForm
