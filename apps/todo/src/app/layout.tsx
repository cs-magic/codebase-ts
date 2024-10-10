import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo 管理器',
  description: '一个简单而优雅的 Todo 管理应用',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-100 to-purple-100`}>
        {children}
      </body>
    </html>
  )
}