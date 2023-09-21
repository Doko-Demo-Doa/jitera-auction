import { BlitzPage } from "@blitzjs/next"
import { Button, Space } from "@mantine/core"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import AuctionList from "src/auctions/components/AuctionList"

const Home: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Jitera Auctions">
      <Button
        onClick={() => {
          router.push("/auctions/create").catch(console.log)
        }}
      >
        Create Auction
      </Button>
      <Space h="xl" />
      <AuctionList />
    </Layout>
  )
}

export default Home
