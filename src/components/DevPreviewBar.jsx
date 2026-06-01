'use client'

/** Visible only in `next dev` so the correct project is obvious vs other landing pages on :3000. */
export function DevPreviewBar() {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-ics-primary/40 bg-ics-black px-3 py-2 text-center text-xs font-semibold text-white shadow-lg"
      role="status"
      aria-live="polite"
    >
      ICS Roofing preview —{' '}
      <a href="http://127.0.0.1:3102" className="text-ics-primary underline underline-offset-2">
        http://127.0.0.1:3102
      </a>
    </div>
  )
}
