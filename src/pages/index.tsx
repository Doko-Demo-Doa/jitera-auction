import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Button } from "@mantine/core"
import { useRouter } from "next/router"

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
    </Layout>
  )
}

export default Home
