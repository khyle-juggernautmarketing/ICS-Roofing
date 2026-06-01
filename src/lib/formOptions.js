export const SERVICE_OPTIONS = [
  {
    value: 'roof-replacement',
    label: 'Roof Replacement',
    icon: 'home',
    disabled: false,
  },
  {
    value: 'roof-repair-inspection',
    label: 'Roof Repair / Inspection',
    icon: 'hammer',
    disabled: false,
  },
  {
    value: 'commercial-roofing',
    label: 'Commercial Roofing',
    icon: 'building',
    disabled: false,
  },
  {
    value: 'roofing-solar',
    label: 'Roofing & Solar Integration',
    icon: 'sun',
    disabled: false,
  },
  {
    value: 'storm-emergency',
    label: 'Storm / Emergency Leak (Coming Soon)',
    icon: 'zap',
    disabled: true,
  },
]

export const TIMELINE_OPTIONS = [
  {
    value: 'asap-urgent',
    label: 'ASAP — Active Leak or Storm Damage',
    icon: 'zap',
  },
  {
    value: 'within-1-3-months',
    label: 'Within 1–3 Months',
    icon: 'calendar',
  },
  {
    value: 'planning-ahead',
    label: 'Planning Ahead / Getting Estimates',
    icon: 'search',
  },
]

/** Includes legacy values so older partial submissions still validate server-side. */
export const SERVICES = [
  ...SERVICE_OPTIONS.filter((o) => !o.disabled).map((o) => o.value),
  'adu-luxury-home',
  'commercial-structural',
]

export const TIMELINES = TIMELINE_OPTIONS.map((o) => o.value)
