import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UBL Chatbot - Banking Assistant',
  description: 'Professional UBL banking assistant powered by AI',
  keywords: 'UBL, banking, chatbot, assistant, Pakistan',
  authors: [{ name: 'UBL Digital' }],
  icons: {
    icon: '/ubl_logo_1.png',
    shortcut: '/ubl_logo_1.png',
    apple: '/ubl_logo_1.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ubl_logo_1.png" />
        <link rel="apple-touch-icon" href="/ubl_logo_1.png" />
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
