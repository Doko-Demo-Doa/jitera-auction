import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Button, Container, Space, Text, Title } from "@mantine/core"

import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useMutation, useQuery } from "@blitzjs/rpc"
import airdrop from "src/faucet/mutations/airdrop"
import getCurrentUser from "src/users/queries/getCurrentUser"

const FaucetPage: BlitzPage = () => {
  const router = useRouter()
  const [user, { refetch }] = useQuery(getCurrentUser, null)
  const [airdropMutation, { isLoading }] = useMutation(airdrop)

  if (!user) {
    return (
      <Layout title="Jitera Faucet">
        <Container size="lg">
          <Title order={3}>Please login first</Title>
          <Space h="xl" />

          <Button onClick={() => router.push(Routes.LoginPage())}>Login</Button>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout title="Jitera Faucet">
      <Container size="lg">
        <Title order={3}>Faucet</Title>
        <Text>You can get your money here</Text>
        <Text>{`Your balance: ${user.balance}`}</Text>
        <Space h="xl" />
        <Button
          loading={isLoading}
          onClick={async () => {
            await airdropMutation()
            await refetch()
          }}
        >
          {isLoading ? "Requesting..." : "Get Money"}
        </Button>
      </Container>
    </Layout>
  )
}

export default FaucetPage
