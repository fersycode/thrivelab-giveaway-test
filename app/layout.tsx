import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { FormProvider } from '@/lib/FormContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Thrivelab Giveaway - Win $10,000 Stem Cell Treatment',
  description: 'Enter for a chance to win a $10,000 in-home stem cell treatment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  )
}