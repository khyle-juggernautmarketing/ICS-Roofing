'use client'

import { CalendarCheck, CheckCircle2, Home, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_TAGLINE,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
} from '@/lib/constants'
import { MEDIA } from '@/lib/media'

export function ThankYouContent() {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('ics-thankyou')
      if (raw) setDetails(JSON.parse(raw))
    } catch {
      setDetails({ booked: false })
    }
  }, [])

  const booked = details?.booked === true
  const name = details?.name
  const appointmentDisplay = details?.appointmentDisplay

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,74,43,0.15)_0%,_transparent_55%)]"
        aria-hidden
      />

      <header className="relative border-b border-white/10 bg-ics-black/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
          <Image
            src={MEDIA.logo}
            alt={BRAND_NAME}
            width={160}
            height={48}
            className="h-8 w-auto rounded-md bg-ics-black px-2 py-1 sm:h-9"
          />
          <div>
            <p className="font-display text-lg font-extrabold text-white">
              {BRAND_SHORT}{' '}
              <span className="text-ics-primary">{BRAND_TAGLINE}</span>
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ics-gray-400">
              Sacramento, CA
            </p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="rounded-2xl border border-ics-gray-200 bg-white p-8 text-center shadow-2xl sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ics-primary-light">
            {booked ? (
              <CalendarCheck className="h-10 w-10 text-ics-primary" strokeWidth={2} aria-hidden />
            ) : (
              <CheckCircle2 className="h-10 w-10 text-ics-primary" strokeWidth={2} aria-hidden />
            )}
          </div>

          <h1 className="mt-6 font-display text-2xl font-extrabold text-ics-black sm:text-3xl">
            {booked ? 'Your Appointment Is Confirmed!' : 'Thank You — We Got Your Request!'}
          </h1>

          {name && (
            <p className="mt-2 text-ics-gray-600">
              Thanks, {name}! Our roofing team will be in touch soon.
            </p>
          )}

          {booked && appointmentDisplay && (
            <div className="mt-6 rounded-xl border border-ics-primary/25 bg-ics-primary-light px-4 py-4 text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-ics-primary">
                Scheduled inspection
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ics-black">{appointmentDisplay}</p>
              <p className="mt-2 text-xs text-ics-gray-600">
                Pacific Time · Please allow up to 90 minutes for your on-site roofing assessment.
              </p>
            </div>
          )}

          {!booked && (
            <p className="mt-4 text-sm leading-relaxed text-ics-gray-600">
              We received your roofing quote request. A team member will call or email you shortly to
              help schedule your free roof inspection.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ics-primary px-6 text-sm font-bold text-white transition-colors hover:bg-ics-primary-dark"
            >
              <Home className="h-4 w-4" aria-hidden />
              Back to Home
            </Link>
            <a
              href={PHONE_PRIMARY_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-ics-gray-200 px-6 text-sm font-bold text-ics-gray-900 transition-colors hover:border-ics-primary hover:bg-ics-primary-light"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {PHONE_PRIMARY}
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ics-gray-400">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </main>
    </div>
  )
}
