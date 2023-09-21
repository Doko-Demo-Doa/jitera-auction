import { useQuery } from "@blitzjs/rpc"
import { Badge, Button, Card, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core"
import dayjs from "dayjs"
import getLatestAuctions from "src/auctions/queries/getLatestAuctions"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const AuctionList = () => {
  const [auctions, { isLoading }] = useQuery(getLatestAuctions, null)

  if (isLoading) {
    return <Loader />
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
              <Text size="sm">{`Ends at: ${dayjs(auction.endsAt).format(
                "DD/MM/YYYY HH:mm"
              )}`}</Text>

              <Button color="green" fullWidth={false}>
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
