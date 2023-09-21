import { NumberInput, Button } from "@mantine/core"
import { zodResolver, useForm } from "@mantine/form"
import { modals } from "@mantine/modals"
import { Auction, UserAuction } from "@prisma/client"
import React from "react"
import { BidAuctionSchemaType, BidAuctionSchema } from "../schemas"

interface Props {
  item: Auction & { highest: UserAuction | null }
}

const BidForm: React.FC<Props> = ({ item }) => {
  const min = item.highest ? item.highest.setPrice : item.startingPrice + item.priceStep

  const form = useForm<BidAuctionSchemaType>({
    validate: zodResolver(BidAuctionSchema),
    initialValues: {
      auctionId: item.id,
      setPrice: min,
    },
  })

  return (
    <>
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
        disabled={form.values.setPrice < min}
      >
        Submit
      </Button>
    </>
  )
}

export default BidForm
