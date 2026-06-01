export const BRAND_NAME = 'ICS Roofing & Construction'
export const BRAND_SHORT = 'ICS'
export const BRAND_TAGLINE = 'Roofing'

export const PHONE_PRIMARY = '(916) 555-0144'
export const PHONE_PRIMARY_HREF = 'tel:+19165550144'

export const EMAIL = 'office@icsroofingca.com'

export const OWNER = 'David Esparza'

export const ADDRESS_SHORT = 'Sacramento, California'
export const ADDRESS_REGION = 'Greater Sacramento Metropolitan Area'

export const YEAR_ESTABLISHED = '2015'
export const EXPERIENCE_LABEL = 'Over a Decade in Roofing'

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

export const HERO_BADGE =
  'Over a Decade Serving Sacramento — Licensed Roofing — DBE Certified'

export const VALUE_PROPS = [
  '100% Certified Minority & Women-Owned Enterprise (DBE Certified)',
  'Free roof inspections, honest assessments, and clear line-item estimates',
  'Over a decade of trusted roof replacement, repair, and storm-damage response',
]

export const STATS = [
  { value: '10+', suffix: '', label: 'Years Serving Sacramento Roofs' },
  { value: '1,188+', suffix: '', label: 'Happy Roofing Customers' },
  { value: '33', suffix: '', label: 'Trusted Material & Trade Partners' },
  { value: '476+', suffix: '', label: 'Roofing Projects Completed' },
]

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Free Roof Quote',
    description:
      'Tell us about your roof online or by phone — we respond quickly with next steps for a no-obligation evaluation.',
  },
  {
    step: 2,
    title: 'On-Site Roof Inspection',
    description:
      "David Esparza's crews document decking, flashing, ventilation, and damage so you get an accurate scope — not a guess.",
  },
  {
    step: 3,
    title: 'Clear Roofing Proposal',
    description:
      'Receive a detailed estimate with material options, warranty information, and a realistic install timeline.',
  },
  {
    step: 4,
    title: 'Expert Roof Installation',
    description:
      'Our DBE-certified roofers install to code, protect your property, and leave the site clean when we are finished.',
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
  'Sacramento roofing specialists focused on durable replacements, reliable repairs, and roofs built to handle Central Valley heat, wind, and winter storms.'

export const ANNOUNCEMENT_TEXT =
  '🏆 Over a Decade of Roofing Excellence: Minority, Women-Owned, and DBE-Certified. Serving Sacramento & Surrounding Areas. Call Our Team:'

export const PRIVACY_CONSENT_TEXT =
  'By clicking submit, you authorize ICS Roofing to text or call regarding this free quote under CCPA privacy compliance standards.'

export const OPERATING_HOURS =
  'Operational Hours: Monday - Friday: 7:00 AM - 6:00 PM / Emergency Roof Leak Dispatch Available'

export const CERTIFICATION_FOOTNOTE =
  '100% Hispanic American Women Operated | Minority, Women-Owned, & DBE Certified Entity.'
