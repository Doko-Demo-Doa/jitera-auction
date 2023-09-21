import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, Group, NavLink } from "@mantine/core"
import { IconHome2, IconHammer } from "@tabler/icons-react"
import { useRouter } from "next/router"

const MENU = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/auctions/create",
    label: "Create Auction",
  },
]

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [opened, { toggle }] = useDisclosure()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title || "Jitera Auction"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Navbar p="md">
          <NavLink
            label="Home"
            onClick={() => {
              router.push("/").catch(console.log)
              toggle()
            }}
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Create Auction"
            onClick={() => {
              router.push("/auctions/create").catch(console.log)
              toggle()
            }}
            active
            leftSection={<IconHammer size="1rem" stroke={1.5} />}
          />
        </AppShell.Navbar>

        <AppShell.Header>
          <Group px="md" style={{ height: "100%" }}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
          </Group>
        </AppShell.Header>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  )
}

export default Layout
