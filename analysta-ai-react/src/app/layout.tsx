import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Analysta.AI - Where AI gets practical',
  description: 'Applied AI Lab building practical solutions at the intersection of AI, Data, and Software Engineering. From QA automation to intelligent workflows.',
  keywords: 'AI, Machine Learning, Applied AI, Testing, QA Automation, Software Engineering',
  authors: [{ name: 'Analysta AI Team' }],
  openGraph: {
    title: 'Analysta.AI - Where AI gets practical',
    description: 'Applied AI Lab building practical solutions at the intersection of AI, Data, and Software Engineering.',
    url: 'https://analysta.ai',
    siteName: 'Analysta.AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analysta.AI - Where AI gets practical',
    description: 'Applied AI Lab building practical solutions at the intersection of AI, Data, and Software Engineering.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}