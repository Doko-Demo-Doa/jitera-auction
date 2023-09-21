import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, Button } from "@mantine/core"

const Home: BlitzPage = () => {
  return (
    <Layout title="Jitera Auctions">
      <Button>Create Auction</Button>
    </Layout>
  )
}

export default Home
