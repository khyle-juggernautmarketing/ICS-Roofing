'use client'

import { Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ANNOUNCEMENT_TEXT,
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_TAGLINE,
  NAV_LINKS,
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
} from '@/lib/constants'
import { MEDIA } from '@/lib/media'

const RIBBON_H = '2.5rem'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="bg-ics-black py-2 text-center text-xs font-semibold tracking-wide text-white md:text-sm"
        style={{ minHeight: RIBBON_H }}
      >
        <p className="px-3">
          {ANNOUNCEMENT_TEXT}{' '}
          <a
            href={PHONE_PRIMARY_HREF}
            className="whitespace-nowrap text-ics-primary underline decoration-ics-primary/50 underline-offset-2 hover:text-white"
          >
            {PHONE_PRIMARY}
          </a>
        </p>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? 'border-b border-ics-gray-200/60 bg-white/95 shadow-md backdrop-blur-md'
            : 'bg-ics-gray-900/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 lg:py-4">
          <Link
            href="#"
            className="flex min-h-12 shrink-0 items-center gap-3"
            aria-label={`${BRAND_NAME} home`}
          >
            <Image
              src={MEDIA.logo}
              alt={BRAND_NAME}
              width={200}
              height={56}
              className={`h-8 w-auto max-w-[7.5rem] object-contain object-left sm:h-9 sm:max-w-[8.5rem] ${
                scrolled ? 'rounded-md bg-ics-black px-2 py-1' : ''
              }`}
              priority
            />
            <div className="min-w-0 border-l border-white/15 pl-3 sm:pl-3.5">
              <p
                className={`font-display text-lg font-extrabold leading-none tracking-tight sm:text-xl ${
                  scrolled ? 'text-ics-gray-900' : 'text-white'
                }`}
              >
                {BRAND_SHORT}{' '}
                <span className={scrolled ? 'text-ics-primary-dark' : 'text-ics-primary'}>
                  {BRAND_TAGLINE}
                </span>
              </p>
              <p
                className={`mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.18em] sm:block sm:text-[10px] ${
                  scrolled ? 'text-ics-gray-600' : 'text-ics-gray-400'
                }`}
              >
                Sacramento, CA
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative flex min-h-12 items-center text-xs font-bold uppercase tracking-widest transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-ics-primary after:transition-all hover:after:w-full ${
                  scrolled ? 'text-ics-gray-600 hover:text-ics-gray-900' : 'text-ics-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <a
              href={PHONE_PRIMARY_HREF}
              className={`animate-pulse-ring inline-flex min-h-12 min-w-12 items-center gap-2 rounded-xl px-5 text-sm font-bold ring-2 ring-ics-primary/50 transition-all duration-300 ease-in-out hover:scale-[1.02] ${
                scrolled
                  ? 'bg-ics-gray-900 text-white hover:bg-ics-black'
                  : 'bg-ics-primary text-white hover:bg-ics-primary-dark'
              }`}
              aria-label={`Call now ${PHONE_PRIMARY}`}
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span className="hidden xl:inline">{PHONE_PRIMARY}</span>
              <span className="xl:hidden">Call Now</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`flex min-h-12 min-w-12 items-center justify-center rounded-lg lg:hidden ${
              scrolled ? 'text-ics-gray-900' : 'text-white'
            }`}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] bg-ics-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-[min(100%,20rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-ics-gray-200 px-4 py-4">
          <span className="font-display text-lg font-bold text-ics-gray-900">{BRAND_NAME}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex min-h-12 min-w-12 items-center justify-center rounded-lg text-ics-gray-800"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-mobile-link flex min-h-12 items-center rounded-lg px-4 text-base font-semibold text-ics-gray-800 hover:bg-ics-gray-100"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-ics-gray-200 p-4">
          <a
            href={PHONE_PRIMARY_HREF}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ics-primary text-sm font-bold text-white ring-2 ring-ics-primary/50"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {PHONE_PRIMARY}
          </a>
        </div>
      </div>
    </header>
  )
}

export const NAV_OFFSET = 'calc(2.5rem + 4.25rem)'
