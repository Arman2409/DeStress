import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DeStress',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./logos/logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}