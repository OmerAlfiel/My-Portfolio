import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Omer Ahmed | Web Developer",
  description: "Professional web developer specializing in creating modern, responsive web applications",
  keywords: ["web developer", "frontend developer", "React developer", "Next.js developer", "full-stack developer", "back-end developer", "JavaScript", "TypeScript", "HTML", "CSS"],
  authors: [{ name: "Omer Ahmed" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Omer Ahmed | Web Developer",
    description: "Professional web developer specializing in creating modern, responsive web applications",
    siteName: "Omer's Portfolio",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
