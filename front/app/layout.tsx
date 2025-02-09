import "./globals.css"
import { Inter } from "next/font/google"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Web3Provider } from "../components/Web3Provider"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BlockRent - Blockchain-based Rental Agreements",
  description: "Secure and automated rental agreements using blockchain technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  )
}

