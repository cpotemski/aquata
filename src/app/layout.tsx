import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { TRPCProvider } from "@/trpc/client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aquata", description: "- Home"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <SessionProvider>
      <TRPCProvider>
        {children}
      </TRPCProvider>
    </SessionProvider>
    </body>
    </html>
  )
}
