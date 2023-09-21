import { useQuery } from "@blitzjs/rpc"
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { modals } from "@mantine/modals"
import dayjs from "dayjs"
import { Auction } from "@prisma/client"

import getLatestAuctions from "src/auctions/queries/getLatestAuctions"

const AuctionList = () => {
  const [auctions, { isLoading }] = useQuery(getLatestAuctions, null)

  if (isLoading) {
    return <Loader />
  }

  function openBidModal(item: Auction) {
    modals.open({
      title: "Place Your Bid",
      children: (
        <>
          <TextInput label="" withAsterisk min={0.2} placeholder="Price" mb="sm" data-autofocus />
          <Button fullWidth color="violet" onClick={() => modals.closeAll()} mt="md">
            Submit
          </Button>
        </>
      ),
    })
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
                  <Badge color="pink" variant="light">
                    Starting Price
                  </Badge>
                  <Text>{`${auction.startingPrice} USD`}</Text>
                </Group>

                <Group>
                  <Badge color="yellow" variant="light">
                    Current Highest Price
                  </Badge>
                  <Text>{`${auction.startingPrice} USD`}</Text>
                </Group>
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
