import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'PawFect Studio — Salon de Toilettage Premium | Premium Pet Grooming',
  description:
    'PawFect Studio, salon de toilettage premium à Paris. Coupe, bain, soin SPA pour chiens et chats. Prise de rendez-vous en ligne. | Premium pet grooming salon in Paris.',
  keywords: ['pet grooming', 'toilettage', 'chien', 'chat', 'salon', 'Paris', 'PawFect', 'grooming'],
  authors: [{ name: 'PawFect Studio' }],
  creator: 'PawFect Studio',
  openGraph: {
    type: 'website',
    url: 'https://pawfect-studio.com',
    title: 'PawFect Studio — Salon de Toilettage Premium',
    description: 'Votre compagnon mérite le meilleur. Toilettage, soins SPA et plus encore à Paris.',
    siteName: 'PawFect Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PawFect Studio — Premium Pet Grooming',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PawFect Studio — Premium Pet Grooming',
    description: 'Votre compagnon mérite le meilleur.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon:    '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple:   '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://pawfect-studio.com'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
