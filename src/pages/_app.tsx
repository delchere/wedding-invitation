import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { MUIProvider } from '@/providers'
import 'slick-carousel/slick/slick.css'
import '@/styles/globals.css'
import '@/styles/site.css'
import '@/styles/dress-code.css'
//import { Splash } from '@/components/splash'
import weddingConfig from '@/config/wedding.config'
import { LocaleProvider } from '@/context/locale-context'

// eslint-disable-next-line @typescript-eslint/ban-types
type CustomAppProps = {}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event: ErrorEvent) => {
      const isExtension =
        event.filename?.includes('chrome-extension://') ||
        event.error?.stack?.includes('chrome-extension://') ||
        event.message?.includes('chrome: call method')
      if (isExtension) {
        event.stopImmediatePropagation()
      }
    },
    true
  )

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const msg = reason?.message || String(reason || '')
      const stack = reason?.stack || ''
      const isExtension =
        msg.includes('chrome-extension://') ||
        msg.includes('chrome: call method') ||
        stack.includes('chrome-extension://')
      if (isExtension) {
        event.stopImmediatePropagation()
        event.preventDefault()
      }
    },
    true
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function MyCustomApp({ Component, pageProps }: AppProps & CustomAppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#f7f2e9" />
        <meta
          name="description"
          content={`We're happy to invite you to ${weddingConfig.people.bride.firstName} and ${weddingConfig.people.groom.firstName}'s wedding.`}
        />
        <title>{weddingConfig.date.date}</title>
      </Head>
      <MUIProvider>
        <CssBaseline />
        <LocaleProvider>
          <Component {...pageProps} />
        </LocaleProvider>
      </MUIProvider>
    </>
  )
}

MyCustomApp.getInitialProps = async (context: AppContext): Promise<CustomAppProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return {
    ...ctx,
  }
}

export default MyCustomApp
