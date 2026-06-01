import Link from 'next/link'
import {
  ADDRESS_REGION,
  ADDRESS_SHORT,
  BRAND_NAME,
  CERTIFICATION_FOOTNOTE,
  EMAIL,
  FOOTER_LINKS,
  FOOTER_TAGLINE,
  OPERATING_HOURS,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
} from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-ics-gray-800 bg-ics-black px-4 py-16 text-ics-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold text-white">{BRAND_NAME}</p>
          <p className="mt-4 text-sm leading-relaxed">{FOOTER_TAGLINE}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Navigation</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-12 items-center text-sm transition-colors duration-300 hover:text-ics-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">Contact</p>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed">
            <p>{ADDRESS_SHORT}</p>
            <p>{ADDRESS_REGION}</p>
            <p>
              <a
                href={`mailto:${EMAIL}`}
                className="transition-colors duration-300 hover:text-ics-primary"
              >
                {EMAIL}
              </a>
            </p>
            <p>
              <a
                href={PHONE_PRIMARY_HREF}
                className="font-semibold text-white transition-colors duration-300 hover:text-ics-primary"
              >
                {PHONE_PRIMARY}
              </a>
            </p>
          </address>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            Operational Standards &amp; Credentials
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            <span aria-hidden className="mr-1">
              🕒
            </span>
            {OPERATING_HOURS}
          </p>
          <p className="mt-4 text-sm leading-relaxed">{CERTIFICATION_FOOTNOTE}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-ics-gray-800 pt-8 text-xs sm:flex-row">
        <p>© 2026 ICS Roofing &amp; Construction. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="flex min-h-12 items-center transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="flex min-h-12 items-center transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
