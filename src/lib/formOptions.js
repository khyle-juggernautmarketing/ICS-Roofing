export const SERVICE_OPTIONS = [
  {
    value: 'roofing-solar',
    label: 'Roofing & Solar Integrations',
    icon: 'sun',
    disabled: false,
  },
  {
    value: 'adu-luxury-home',
    label: 'ADU / Luxury New Home Construction',
    icon: 'home',
    disabled: false,
  },
  {
    value: 'commercial-structural',
    label: 'Commercial Structural Projects',
    icon: 'building',
    disabled: false,
  },
  {
    value: 'drywall-repair',
    label: 'Drywall & Specialty Repair (Coming Soon)',
    icon: 'hammer',
    disabled: true,
  },
]

export const TIMELINE_OPTIONS = [
  {
    value: 'asap-urgent',
    label: 'ASAP / Urgent Deployment',
    icon: 'zap',
  },
  {
    value: 'within-1-3-months',
    label: 'Within 1-3 Months',
    icon: 'calendar',
  },
  {
    value: 'planning-ahead',
    label: 'Just Planning Ahead / Architectural Discovery',
    icon: 'search',
  },
]

export const SERVICES = SERVICE_OPTIONS.filter((o) => !o.disabled).map((o) => o.value)
export const TIMELINES = TIMELINE_OPTIONS.map((o) => o.value)
