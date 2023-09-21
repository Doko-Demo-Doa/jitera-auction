import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, NavLink } from "@mantine/core"
import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
  IconHammer,
} from "@tabler/icons-react"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [opened, { toggle }] = useDisclosure()

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
          <NavLink label="Home" leftSection={<IconHome2 size="1rem" stroke={1.5} />} />
          <NavLink
            label="Create Auction"
            active
            leftSection={<IconHammer size="1rem" stroke={1.5} />}
          />
        </AppShell.Navbar>

        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Jitera</div>
        </AppShell.Header>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  )
}

export default Layout
