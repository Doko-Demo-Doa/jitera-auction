import { BlitzPage } from "@blitzjs/next"
import { useForm } from "@mantine/form"

import Layout from "src/core/layouts/Layout"
import CreateAuctionForm from "src/auctions/components/CreateAuctionForm"
import { Container } from "@mantine/core"

const Page: BlitzPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  return (
    <Layout title="Jitera Auctions">
      <Container size="lg">
        <CreateAuctionForm />
      </Container>
    </Layout>
  )
}

export default Page
