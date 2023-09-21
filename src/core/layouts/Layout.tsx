import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, Button } from "@mantine/core"

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
