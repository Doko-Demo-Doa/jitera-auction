import { useQuery } from "@blitzjs/rpc"
import {
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { modals } from "@mantine/modals"
import dayjs from "dayjs"
import { Auction, UserAuction } from "@prisma/client"

import getLatestAuctions from "src/auctions/queries/getLatestAuctions"
import { IconDatabase } from "@tabler/icons-react"
import { useForm, zodResolver } from "@mantine/form"
import { BidAuctionSchema, BidAuctionSchemaType } from "../schemas"
import BidForm from "./BidForm"

const AuctionList = () => {
  const [auctions, { isLoading }] = useQuery(getLatestAuctions, null)

  if (isLoading) {
    return <Loader />
  }

  function openBidModal(item: Auction & { highest: UserAuction | null }) {
    modals.open({
      title: "Place Your Bid",
      children: <BidForm item={item} />,
    })
  }

  if (!auctions.length) {
    return (
      <Center>
        <Stack align="center" justify="center">
          <IconDatabase />
          <Title order={3}>No data</Title>
        </Stack>
      </Center>
    )
  }

  return (
    <>
      <Stack>
        {auctions.map((auction) => (
          <Card key={auction.id}>
            <Group justify="space-between" mt="md" mb="xs">
              <Stack>
                <Title order={3} fw={500}>
                  {auction.name}
                </Title>
                <Text size="sm">{auction.description}</Text>
              </Stack>

              <Stack>
                <Group>
                  <Badge color="blue" variant="light">
                    Starting Price
                  </Badge>
                  <Text>{`${auction.startingPrice} USD`}</Text>
                </Group>

                <Group>
                  <Badge color="pink" variant="light">
                    Price Step
                  </Badge>
                  <Text>{`${auction.priceStep} USD`}</Text>
                </Group>

                {auction.highest && (
                  <Group>
                    <Badge color="yellow" variant="light">
                      Current Highest Price
                    </Badge>
                    <Text>{`${auction.startingPrice} USD`}</Text>
                  </Group>
                )}
              </Stack>
            </Group>

            <Divider my="md" />

            <Group justify="flex-end">
              <Text size="sm">
                {`Ends at: ${dayjs(auction.endsAt).format("DD/MM/YYYY HH:mm")}`}
              </Text>

              <Button color="green" fullWidth={false} onClick={() => openBidModal(auction)}>
                Bid
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  )
}

export default AuctionList
