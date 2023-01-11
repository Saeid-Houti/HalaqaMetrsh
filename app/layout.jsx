"use client"
import './globals.css'
import styles from './page.module.css'
import Head from './head'
import Footer from './footer'
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react"

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      {/* <head /> */}
      <body>
        <NextUIProvider>
          <SessionProvider>

            {/* <Head /> */}
            {children}
            {/* <Footer /> */}
          </SessionProvider>
        </NextUIProvider >

      </body>
    </html>
  )
}
