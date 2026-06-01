export const BRAND_NAME = 'ICS Roofing & Construction'
export const BRAND_SHORT = 'ICS'
export const BRAND_TAGLINE = 'Roofing'

export const PHONE_PRIMARY = '(916) 555-0144'
export const PHONE_PRIMARY_HREF = 'tel:+19165550144'

export const EMAIL = 'office@icsroofingca.com'

export const OWNER = 'David Esparza'

export const ADDRESS_SHORT = 'Sacramento, California'
export const ADDRESS_REGION = 'Greater Sacramento Metropolitan Area'

export const YEAR_ESTABLISHED = '1994'
export const EXPERIENCE_LABEL = '30+ Years in Business'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://127.0.0.1:3102')

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Stats', href: '#stats' },
  { label: 'Process', href: '#process' },
  { label: 'Locations', href: '#locations' },
]

export const FOOTER_LINKS = NAV_LINKS

export const VALUE_PROPS = [
  '100% Certified Minority & Women-Owned Enterprise (DBE Certified)',
  'Comprehensive Professional Roof, Solar, & Structural Appraisals',
  'Decades of Proven Structural Engineering Across 470+ Completed Projects',
]

export const STATS = [
  { value: '30', suffix: '', label: 'Years In Business Successfully' },
  { value: '1,188+', suffix: '', label: 'Happy Local Customers' },
  { value: '33', suffix: '', label: 'Trusted Strategic Partners' },
  { value: '476', suffix: '', label: 'Premium Projects Completed' },
]

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Personalized Quote',
    description:
      'Request an evaluation through our secure, authenticated digital portal.',
  },
  {
    step: 2,
    title: 'Engineering Review',
    description:
      "David Esparza's specialized dispatch crews document physical site conditions and project blueprints.",
  },
  {
    step: 3,
    title: 'Sustainable Planning',
    description:
      'Receive an explicit line-item proposal mapping fixed material cost variables with proactive scheduling updates.',
  },
  {
    step: 4,
    title: 'Professional Construction',
    description:
      'Our DBE-certified team deploys safely, achieving superior craftsmanship while maintaining zero debris site rules.',
  },
]

export const GEO_CITIES = [
  { name: 'Sacramento', featured: true, label: 'Sacramento, CA' },
  { name: 'Roseville', featured: false },
  { name: 'Folsom', featured: false },
  { name: 'Elk Grove', featured: false },
  { name: 'Citrus Heights', featured: false },
  { name: 'Rancho Cordova', featured: false },
  { name: 'Rocklin', featured: false },
  { name: 'Davis', featured: false },
  { name: 'Woodland', featured: false },
  { name: 'Carmichael', featured: false },
  { name: 'Fair Oaks', featured: false },
  { name: 'West Sacramento', featured: false },
  { name: 'El Dorado Hills', featured: false },
]

export const FOOTER_TAGLINE =
  'Building strong, sustainable communities and quality custom homes, ensuring every asset meets the highest standards of professional execution.'

export const ANNOUNCEMENT_TEXT =
  '🏆 30+ Years of Excellence: Proudly Minority, Women-Owned, and DBE-Certified. Serving Sacramento & Surrounding Areas. Call Our Team:'

export const PRIVACY_CONSENT_TEXT =
  'By clicking submit, you authorize ICS Roofing to text or call regarding this free quote under CCPA privacy compliance standards.'

export const OPERATING_HOURS =
  'Operational Hours: Monday - Friday: 7:00 AM - 6:00 PM / Emergency Deployment Dispatch Teams'

export const CERTIFICATION_FOOTNOTE =
  '100% Hispanic American Women Operated | Minority, Women-Owned, & DBE Certified Entity.'
