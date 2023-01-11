import './globals.css'
import Head from './header'
import Footer from './footer'

export default function AppLayout({ children }) {
  return (

    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      {/* <head /> */}
      <body>
        <Head />
        {children}
        <Footer />

      </body>
    </html>
  )
}
