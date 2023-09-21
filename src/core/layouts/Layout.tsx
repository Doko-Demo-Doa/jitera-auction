import Head from "next/head"
import React from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, Group, NavLink, Space } from "@mantine/core"
import {
  IconHome2,
  IconHammer,
  IconUserPlus,
  IconLogin2,
  IconLogout,
  IconUser,
} from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode; withoutNav?: boolean }> = ({
  title,
  children,
  withoutNav,
}) => {
  const [logoutMutation] = useMutation(logout)
  const user = useCurrentUser()
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
        navbar={
          withoutNav ? undefined : { width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }
        }
        padding="md"
      >
        {!withoutNav && (
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

            <Space style={{ flexGrow: 2 }} />

            {user && (
              <NavLink label={user.email} leftSection={<IconUser size="1rem" stroke={1.5} />} />
            )}
            <NavLink
              label="Log out"
              onClick={async () => {
                await logoutMutation()
                toggle()
                router.push("/auth/login").catch(console.log)
              }}
              leftSection={<IconLogout size="1rem" stroke={1.5} />}
            />
          </AppShell.Navbar>
        )}

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
