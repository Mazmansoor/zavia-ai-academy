import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Strategic AI Academy - From Foundation to Mastery',
  description: 'The Anti-Bootcamp: Compressed, rigorous AI training that builds judgment—not just tool knowledge.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
