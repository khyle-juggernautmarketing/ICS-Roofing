import { STATS } from '@/lib/constants'

export function StatsRibbon() {
  return (
    <section
      id="stats"
      className="my-12 overflow-hidden border-y border-ics-gray-200/60 bg-white py-10 shadow-sm"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl px-2">
            <p className="font-display text-3xl font-extrabold text-ics-primary sm:text-4xl">
              {stat.value}
              {stat.suffix}
            </p>
            <p className="mt-2 text-xs font-medium leading-snug text-ics-gray-600 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
