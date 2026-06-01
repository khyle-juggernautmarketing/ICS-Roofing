import Link from 'next/link'
import { BRAND_NAME, EMAIL } from '@/lib/constants'

export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <article className="prose prose-slate mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-ics-primary hover:underline">
          ← Back to home
        </Link>
        <h1 className="font-display mt-6 text-3xl font-bold">Privacy Policy</h1>
        <p className="text-ics-gray-600">Last updated: June 1, 2026</p>

        <section className="mt-8 space-y-4 text-ics-gray-800">
          <p>
            {BRAND_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This
            policy describes how we collect, use, and protect information submitted through our website
            and lead forms.
          </p>
          <h2 className="text-xl font-bold text-ics-black">Information we collect</h2>
          <p>
            When you request a quote, we may collect your name, email, phone number, property address,
            service preferences, and timeline information you provide voluntarily.
          </p>
          <h2 className="text-xl font-bold text-ics-black">How we use information</h2>
          <p>
            We use your information to respond to inquiries, schedule evaluations, prepare proposals,
            and deliver roofing, solar, and construction services you request.
          </p>
          <h2 className="text-xl font-bold text-ics-black">CCPA rights</h2>
          <p>
            California residents may have rights to access, delete, or opt out of certain data uses.
            Contact us to exercise applicable rights under the California Consumer Privacy Act.
          </p>
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <p>
            Questions about this policy may be directed to{' '}
            <a href={`mailto:${EMAIL}`} className="text-ics-primary hover:underline">
              {EMAIL}
            </a>
            .
          </p>
          <p className="text-sm text-ics-gray-600">
            This page is a placeholder. Consult legal counsel for a production-ready privacy policy
            aligned with CCPA and applicable state requirements.
          </p>
        </section>
      </article>
    </div>
  )
}
