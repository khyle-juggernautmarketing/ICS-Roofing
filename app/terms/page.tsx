import Link from 'next/link'
import { BRAND_NAME, EMAIL, PHONE_PRIMARY, PHONE_PRIMARY_HREF } from '@/lib/constants'

export const metadata = {
  title: 'Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <article className="prose prose-slate mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-ics-primary hover:underline">
          ← Back to home
        </Link>
        <h1 className="font-display mt-6 text-3xl font-bold">Terms of Service</h1>
        <p className="text-ics-gray-600">Last updated: June 1, 2026</p>

        <section className="mt-8 space-y-4 text-ics-gray-800">
          <p>
            These terms govern use of the {BRAND_NAME} website and any quote requests submitted
            through our digital forms. By using this site, you agree to these terms.
          </p>
          <h2 className="text-xl font-bold text-ics-black">Quotes and estimates</h2>
          <p>
            Online submissions do not constitute a binding contract. All projects require written
            agreements, permits where applicable, and final pricing confirmed by our team.
          </p>
          <h2 className="text-xl font-bold text-ics-black">Communications</h2>
          <p>
            By submitting a form, you authorize us to contact you by phone, text, or email regarding
            your project inquiry, consistent with our Privacy Policy and applicable law.
          </p>
          <h2 className="text-xl font-bold text-ics-black">Contact</h2>
          <p>
            For questions about these terms, contact{' '}
            <a href={`mailto:${EMAIL}`} className="text-ics-primary hover:underline">
              {EMAIL}
            </a>{' '}
            or call{' '}
            <a href={PHONE_PRIMARY_HREF} className="text-ics-primary hover:underline">
              {PHONE_PRIMARY}
            </a>
            .
          </p>
          <p className="text-sm text-ics-gray-600">
            This page is a placeholder. Consult legal counsel for production-ready terms of service.
          </p>
        </section>
      </article>
    </div>
  )
}
