import Head from "next/head"
import React, { useEffect } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { useDisclosure, useHotkeys } from "@mantine/hooks"
import { AppShell, Burger, Group, NavLink, Space, Text, useMantineColorScheme } from "@mantine/core"
import { IconHome2, IconHammer, IconLogout, IconUser, IconMoneybag } from "@tabler/icons-react"
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

  const { colorScheme, setColorScheme } = useMantineColorScheme()

  // https://mantine.dev/guides/dark-theme/
  useHotkeys([["mod+J", () => setColorScheme(colorScheme === "dark" ? "light" : "dark")]])

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
              active={router.route === "/"}
              leftSection={<IconHome2 size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Create Auction"
              onClick={() => {
                router.push("/auctions/create").catch(console.log)
                toggle()
              }}
              active={router.route === "/auctions/create"}
              leftSection={<IconHammer size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Get Balance"
              onClick={() => {
                router.push(Routes.FaucetPage()).catch(console.log)
                toggle()
              }}
              active={router.route === "/faucet"}
              leftSection={<IconMoneybag size="1rem" stroke={1.5} />}
            />

            <Space style={{ flexGrow: 2 }} />

            {user && (
              <NavLink label={user.email} leftSection={<IconUser size="1rem" stroke={1.5} />} />
            )}
            {user && (
              <NavLink
                label={"Log out"}
                onClick={async () => {
                  await logoutMutation()
                  toggle()
                  router.push("/auth/login").catch(console.log)
                }}
                leftSection={<IconLogout size="1rem" stroke={1.5} />}
              />
            )}
          </AppShell.Navbar>
        )}

        <AppShell.Header>
          <Group px="md" style={{ height: "100%" }}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
            <Text>Jitera</Text>
          </Group>
        </AppShell.Header>

        <AppShell.Main
          style={(theme) => ({
            backgroundColor: colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          })}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  )
}

export default Layout
