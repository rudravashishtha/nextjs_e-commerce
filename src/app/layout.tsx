import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import SessionProvider from "./SessionProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flowmazon',
  description: 'We make your wallet cry.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Navbar />
        <main className='p-4 max-w-7xl min-w-[300px] m-auto'>
          {children}
        </main>
        <div><Footer /></div>
        </SessionProvider>
      </body>
    </html>
  )
}
