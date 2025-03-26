import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import './globals.css'
import { ConvexClientProvider } from "./ConvexClientProvider"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Grace Community Church",
  description: "A place of worship, community, and spiritual growth",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <MainNav />
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



