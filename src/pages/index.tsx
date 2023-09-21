import { BlitzPage } from "@blitzjs/next"
import { Space } from "@mantine/core"

import Layout from "src/core/layouts/Layout"
import AuctionList from "src/auctions/components/AuctionList"

const Home: BlitzPage = () => {
  return (
    <Layout title="Jitera Auctions">
      <Space h="xl" />
      <AuctionList />
    </Layout>
  )
}

export default Home
