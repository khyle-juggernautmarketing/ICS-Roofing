import { ArrowRight, Building2, Hammer, Sun } from 'lucide-react'
import Link from 'next/link'

const SERVICE_ROWS = [
  {
    title: 'Premium Roofing & Solar Eco-Integrations',
    description:
      'High-efficiency roof systems paired with professional solar integration for Sacramento homes and businesses. We engineer durable assemblies that lower energy costs while protecting your structure through Central Valley heat, wind, and seasonal storms.',
    cta: 'Explore Roofing & Solar',
    icon: Sun,
    gradient: 'from-ics-primary/20 via-ics-gray-800 to-ics-gray-900',
    reverse: false,
  },
  {
    title: 'ADU Design & Luxury New Home Construction',
    description:
      'From accessory dwelling units to ground-up luxury residences, ICS delivers precision framing, code-compliant builds, and architectural collaboration that maximizes property value across the Greater Sacramento metro.',
    cta: 'Start Your Build Consultation',
    icon: Hammer,
    gradient: 'from-ics-primary/25 via-ics-gray-800 to-ics-black',
    reverse: true,
  },
  {
    title: 'Commercial Architecture & Drywall Maintenance',
    description:
      'Structural commercial deployments, tenant improvements, and specialty drywall repair for facilities that demand minimal downtime. Our DBE-certified crews maintain safety-first job sites with proactive scheduling and transparent line-item proposals.',
    cta: 'Request Commercial Assessment',
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
            ICS Professional Grade
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
            Complete Roofing, Solar &amp; Construction Solutions
          </h2>
          <p className="mt-4 text-ics-gray-600">
            High-efficiency infrastructure transformations for residential and commercial properties
            across the Sacramento metro — roofing, solar, ADUs, and structural builds executed with
            30+ years of proven craftsmanship.
          </p>
        </div>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {SERVICE_ROWS.map((row) => (
            <div
              key={row.title}
              className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`order-1 ${row.reverse ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <ServiceMockup row={row} />
              </div>
              <div
                className={`order-2 ${row.reverse ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <ServiceCopy row={row} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
