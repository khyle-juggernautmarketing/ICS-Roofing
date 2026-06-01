import { Check } from 'lucide-react'
import { VALUE_PROPS } from '@/lib/constants'
import { LeadForm } from '@/components/LeadForm'
import { NAV_OFFSET } from '@/components/Navbar'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ics-gray-50">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,74,43,0.18)_0%,_transparent_50%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(234,74,43,0.1)_0%,_transparent_50%)]"
        aria-hidden
      />

      <div
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 lg:grid-cols-12"
        style={{ paddingTop: `calc(${NAV_OFFSET} + 2rem)` }}
      >
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-ics-primary/40 bg-ics-primary/10 px-4 py-1.5 text-xs font-semibold text-ics-primary shadow-sm backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            30 Years In Business — Sacramento, CA — DBE Certified
          </span>

          <h1 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white text-balance sm:text-4xl lg:text-6xl">
            Construct Your Future &amp;{' '}
            <span className="bg-gradient-to-r from-ics-primary to-white bg-clip-text text-transparent">
              Your Dreams
            </span>{' '}
            with Sacramento&apos;s Trusted Roofing &amp; Solar Experts
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ics-gray-200 sm:text-lg">
            Where experience meets professionalism. We bring your vision to life with quality
            craftsmanship, reliable solar integrations, premium ADU framing, and a deep commitment
            to building strong, sustainable California communities.
          </p>

          <ul className="mt-8 space-y-3">
            {VALUE_PROPS.map((prop) => (
              <li key={prop} className="flex gap-3 text-sm text-ics-gray-100 sm:text-base">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ics-primary" strokeWidth={2.5} aria-hidden />
                <span>{prop}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
