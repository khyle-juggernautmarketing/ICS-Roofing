import { PROCESS_STEPS } from '@/lib/constants'

export function Process() {
  return (
    <section id="process" className="bg-ics-gray-50 px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-ics-gray-900 p-8 text-white shadow-xl lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Building Your Vision With Pure Confidence
            </h2>
            <p className="mt-4 text-ics-gray-400">
              Proactive communication, meticulous project metrics tracking, and seamless execution
              from first evaluation through final walkthrough — so your timeline stays on track and
              your investment is protected.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-ics-gray-800/60 bg-ics-gray-800/50 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-ics-primary/40"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ics-primary text-sm font-bold text-ics-black"
                  aria-hidden
                >
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ics-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
