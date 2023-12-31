import React, { Suspense } from "react"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar"
import { Notifications } from "@mantine/notifications"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"

import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import theme from "src/styles/default-theme"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <ProgressBar
            height="2px"
            color="#32a85e"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Notifications />
          <Suspense fallback={<div />}>{getLayout(<Component {...pageProps} />)}</Suspense>
        </ModalsProvider>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
