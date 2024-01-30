"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from './providers/NextAuthProvider'
import { AppProvider } from './store/store'
import Navbar from './components/Navbar'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Footer from './components/Footer'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>

          <AppProvider>
            <div className='max-w-7xl m-auto rounded-md shadow-md mt-5 mb-5 ' >
              <Navbar />
            </div>
            <ProgressBar
              height="3px"
              color="#CD1818"
              options={{ showSpinner: false }}
              shallowRouting
            />
            {children}

            <div className='mt-10 max-w-7xl m-auto rounded-lg border mb-4 bg-white ' >
              <Footer/>
            </div>

          </AppProvider>

        </NextAuthProvider>
      </body>
    </html>
  )
}
