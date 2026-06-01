import { GEO_CITIES } from '@/lib/constants'

export function GeoTargeting() {
  return (
    <section
      id="locations"
      className="border-t border-ics-gray-100 bg-white px-4 py-16 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-bold text-ics-gray-900 sm:text-4xl">
          Proudly Strengthening Sacramento Communities
        </h2>
        <p className="mt-4 text-ics-gray-600">
          Rapid response times for residential and commercial worksites across Northern California and
          the Greater Sacramento metropolitan area — from the Central Valley to surrounding foothill
          communities.
        </p>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
          {GEO_CITIES.map((city) => {
            const label = city.label ?? city.name
            return (
              <span
                key={city.name}
                className={`cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 ${
                  city.featured
                    ? 'border-ics-primary bg-ics-primary/10 font-bold text-ics-gray-900 ring-2 ring-ics-primary/40'
                    : 'border-ics-gray-200/60 bg-ics-gray-100 text-ics-gray-800 hover:bg-ics-gray-200'
                }`}
              >
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
