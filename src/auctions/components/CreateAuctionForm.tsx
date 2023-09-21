import { PromiseReturnType } from "blitz"
import { useMutation } from "@blitzjs/rpc"
import { useForm, zodResolver } from "@mantine/form"
import {
  Button,
  Group,
  NativeSelect,
  NumberInput,
  Space,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import dayjs from "dayjs"

import { AuctionItemSchema, AuctionItemSchemaType } from "src/auctions/schemas"
import createAuction from "src/auctions/mutations/createAuction"

type Props = {
  onSuccess?: (user: PromiseReturnType<typeof createAuction>) => void
}

const CreateAuctionForm = (props: Props) => {
  const [createAuctionMutation] = useMutation(createAuction)

  const form = useForm<AuctionItemSchemaType>({
    validate: zodResolver(AuctionItemSchema),
    initialValues: {
      name: "",
      description: "",
      startingPrice: 0,
      priceStep: 1,
      currency: "USD",
      isEnded: 0,
      startsAt: new Date(),
      endsAt: dayjs().add(2, "days").toDate(),
    },
  })

  function handleSubmit(values: AuctionItemSchemaType) {
    // Code
    console.log(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="E.g: Old watch"
          maxLength={200}
          {...form.getInputProps("name")}
        />
        <Textarea
          withAsterisk
          label="Description"
          description="Enter the item's description. HTML is not allowed."
          placeholder="Type our description here"
          mt="sm"
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Starting Price"
          description="Enter the starting price. Must not be negative"
          placeholder="Enter the starting price."
          mt="sm"
          maxLength={20}
          {...form.getInputProps("startingPrice")}
        />
        <NumberInput
          withAsterisk
          label="Price step"
          description="Enter the minimum bidding price. Must be higher than starting price and non-zero."
          placeholder=""
          mt="sm"
          maxLength={20}
          min={0.1}
          {...form.getInputProps("priceStep")}
        />

        <Group grow align="start">
          <DateTimePicker
            withAsterisk
            label="Starting Date"
            placeholder="Pick date and time"
            mt="sm"
            withSeconds={false}
            {...form.getInputProps("startsAt")}
            value={undefined}
          />

          <DateTimePicker
            withAsterisk
            label="End Date"
            placeholder="Pick date and time"
            mt="sm"
            withSeconds={false}
            {...form.getInputProps("endsAt")}
          />
        </Group>

        <Space h="xl" />

        <Button color="green.7" type="submit">
          Create Auction
        </Button>
      </Stack>
    </form>
  )
}

export default CreateAuctionForm
