import { ArrowRight, Building2, Home, Sun } from 'lucide-react'
import Link from 'next/link'
import { EXPERIENCE_LABEL } from '@/lib/constants'

const SERVICE_ROWS = [
  {
    title: 'Residential Roof Replacement',
    description:
      'Full tear-offs, re-roofs, and upgrades built for Sacramento heat, wind, and seasonal rain. We help you choose the right shingles or membrane system, ventilation, and flashing details so your home stays dry for years.',
    cta: 'Get a Roof Replacement Quote',
    icon: Home,
    gradient: 'from-ics-primary/20 via-ics-gray-800 to-ics-gray-900',
    reverse: false,
  },
  {
    title: 'Roof Repair & Storm Response',
    description:
      'Leaks, missing shingles, damaged flashing, and post-storm assessments handled fast. Our team finds the source of the problem, documents what we see, and recommends repairs that fit your budget — not unnecessary upsells.',
    cta: 'Schedule a Roof Inspection',
    icon: Sun,
    gradient: 'from-ics-primary/25 via-ics-gray-800 to-ics-black',
    reverse: true,
  },
  {
    title: 'Commercial & Solar-Ready Roofing',
    description:
      'Low-slope, TPO, and built-up systems for businesses that need minimal downtime, plus solar-ready roof prep when you are planning panels. DBE-certified crews coordinate scheduling around your operations.',
    cta: 'Request Commercial Roofing Info',
    icon: Building2,
    gradient: 'from-ics-gray-800 via-ics-gray-900 to-ics-black',
    reverse: false,
  },
]

function ServiceMockup({ row }) {
  const Icon = row.icon
  return (
    <div className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      <div
        className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${row.gradient} shadow-card`}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]"
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <Icon className="h-10 w-10 text-ics-primary" strokeWidth={1.5} aria-hidden />
          </div>
          <p className="max-w-xs text-sm font-semibold uppercase tracking-widest text-ics-gray-400">
            ICS Roofing — Sacramento
          </p>
        </div>
      </div>
    </div>
  )
}

function ServiceCopy({ row }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-bold text-ics-gray-900 sm:text-3xl">{row.title}</h3>
      <p className="mt-4 leading-relaxed text-ics-gray-600">{row.description}</p>
      <Link
        href="#"
        className="group/link mt-6 inline-flex min-h-12 items-center gap-2 text-sm font-bold text-ics-gray-900 transition-colors duration-300 hover:text-ics-primary-dark"
      >
        {row.cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-2"
          aria-hidden
        />
      </Link>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="bg-ics-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-ics-gray-900 sm:text-4xl">
            Full-Service Roofing for Sacramento Homes &amp; Businesses
          </h2>
          <p className="mt-4 text-ics-gray-600">
            {EXPERIENCE_LABEL}: replacements, repairs, and commercial systems installed with
            transparent pricing and crews who specialize in roofs — not general contracting side
            projects.
          </p>
        </div>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {SERVICE_ROWS.map((row) => (
            <div
              key={row.title}
              className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className={`order-1 ${row.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                <ServiceMockup row={row} />
              </div>
              <div className={`order-2 ${row.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <ServiceCopy row={row} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
