import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import {
  BRAND_NAME,
  EMAIL,
  EXPERIENCE_LABEL,
  GEO_CITIES,
  PHONE_PRIMARY,
  SITE_URL,
  YEAR_ESTABLISHED,
} from '@/lib/constants'
import { DevPreviewBar } from '@/components/DevPreviewBar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const defaultDescription =
  'ICS Roofing & Construction — commercial & residential roofing, solar integrations, ADUs, and luxury new home building in Sacramento, CA. DBE-certified, minority & women-owned. 30+ years of excellence. Free quotes.'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#ea4a2b',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND_NAME,
  title: {
    default: 'ICS Roofing & Construction | Sacramento Roofing, Solar & ADU Experts',
    template: `%s | ${BRAND_NAME}`,
  },
  appleWebApp: {
    title: BRAND_NAME,
    capable: true,
    statusBarStyle: 'default',
  },
  description: defaultDescription,
  keywords: [
    'ICS Roofing Sacramento',
    'roofing contractor Sacramento CA',
    'solar roof integration Sacramento',
    'ADU construction Sacramento',
    'commercial roofing Central Valley',
    'luxury home builder Northern California',
    'DBE certified roofing contractor',
    'minority women owned roofing Sacramento',
  ],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: 'any' },
    ],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'ICS Roofing & Construction | Sacramento Roofing & Solar',
    description: defaultDescription,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND_NAME,
    images: [{ url: '/logo.png', width: 800, height: 200, alt: `${BRAND_NAME} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICS Roofing & Construction | Sacramento Roofing & Solar',
    description: defaultDescription,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'construction',
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: '+19165550144',
  email: EMAIL,
  description: defaultDescription,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sacramento',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.5816,
    longitude: -121.4944,
  },
  areaServed: GEO_CITIES.map((c) => ({
    '@type': 'City',
    name: c.label ?? c.name,
  })),
  foundingDate: YEAR_ESTABLISHED,
  priceRange: '$$',
  knowsAbout: [
    'Roof replacement',
    'Solar integration',
    'ADU construction',
    'Luxury new home building',
    'Commercial structural projects',
  ],
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Minority-Owned Business', value: true },
    { '@type': 'PropertyValue', name: 'Women-Owned Business', value: true },
    { '@type': 'PropertyValue', name: 'DBE Certified', value: true },
    { '@type': 'PropertyValue', name: 'Experience', value: EXPERIENCE_LABEL },
  ],
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${BRAND_NAME} — Sacramento Roofing, Solar & Construction`,
  description: defaultDescription,
  url: SITE_URL,
  inLanguage: 'en-US',
  isPartOf: { '@type': 'WebSite', name: BRAND_NAME, url: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </head>
      <body className="font-sans" data-site="ics-roofing">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ics-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <DevPreviewBar />
      </body>
    </html>
  )
}
