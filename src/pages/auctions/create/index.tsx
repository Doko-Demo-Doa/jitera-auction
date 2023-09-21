import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import CreateAuctionForm from "src/auctions/components/CreateAuctionForm"
import { Container, Space, Title } from "@mantine/core"

const Page: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Jitera Auctions">
      <Container size="lg">
        <Title order={3}>Create Auction</Title>
        <Space h="xl" />
        <CreateAuctionForm onSuccess={() => router.push(Routes.Home())} />
      </Container>
    </Layout>
  )
}

export default Page
