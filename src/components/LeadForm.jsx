'use client'

import {
  Building2,
  Calendar,
  Hammer,
  Home,
  Loader2,
  MapPin,
  Search,
  Sun,
  Zap,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BookingCalendar, FORM_ONLY_TIMEOUT_MS } from '@/components/BookingCalendar'
import { formatAppointmentPst } from '@/lib/booking'
import { PHONE_PRIMARY, PHONE_PRIMARY_HREF, PRIVACY_CONSENT_TEXT } from '@/lib/constants'
import { SERVICE_OPTIONS, TIMELINE_OPTIONS } from '@/lib/formOptions'

const STEPS = [
  { id: 1, title: 'What roofing service do you need?' },
  { id: 2, title: 'How soon do you need this project?' },
  { id: 3, title: 'Your contact details' },
  { id: 4, title: 'Pick your appointment (PST)' },
]

const TOTAL_STEPS = 4
const PENDING_KEY = 'ics-lead-pending'

const HTML_TAG = /<[^>]*>/g
const inputClass =
  'min-h-12 w-full rounded-xl border border-ics-gray-200 bg-white px-4 text-base text-ics-gray-900 placeholder:text-ics-gray-400 focus:border-ics-primary focus:outline-none focus:ring-2 focus:ring-ics-primary/25 sm:text-sm'

const ICON_MAP = {
  sun: Sun,
  home: Home,
  building: Building2,
  hammer: Hammer,
  zap: Zap,
  calendar: Calendar,
  search: Search,
}

const initialForm = {
  service: '',
  timeline: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  privacyAccepted: false,
}

function sanitizeInput(value) {
  return value.replace(HTML_TAG, '').replace(/[\u0000-\u001F\u007F]/g, '')
}

function useStepAdvanceDelay() {
  const [ms, setMs] = useState(200)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setMs(0)
    })
    return () => cancelAnimationFrame(id)
  }, [])
  return ms
}

function OptionTile({ label, iconKey, selected, disabled, onSelect }) {
  const Icon = ICON_MAP[iconKey] ?? Sun
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`flex min-h-[3.25rem] w-full items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-semibold transition-all duration-200 ease-in-out ${
        disabled
          ? 'cursor-not-allowed border-ics-gray-100 bg-ics-gray-50 text-ics-gray-400 opacity-70'
          : selected
            ? 'cursor-pointer border-ics-primary bg-ics-primary-light ring-2 ring-ics-primary/20'
            : 'cursor-pointer border-ics-gray-200 bg-white hover:border-ics-primary/60'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          selected ? 'bg-ics-primary text-white' : 'bg-ics-gray-100 text-ics-gray-600'
        }`}
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="flex-1 leading-snug">{label}</span>
    </button>
  )
}

function buildPayload(data, submissionId, mode, appointmentAt, honeypot) {
  return {
    service: data.service,
    timeline: data.timeline,
    name: sanitizeInput(data.name.trim()),
    email: sanitizeInput(data.email.trim()),
    phone: sanitizeInput(data.phone.trim()),
    address: sanitizeInput(data.address.trim()),
    privacyAccepted: data.privacyAccepted,
    submissionId,
    mode,
    ...(appointmentAt ? { appointmentAt } : {}),
    _hp: honeypot,
  }
}

export function LeadForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submissionId, setSubmissionId] = useState('')
  const [appointmentIso, setAppointmentIso] = useState('')
  const [timeoutMinutesLeft, setTimeoutMinutesLeft] = useState(10)
  const stepAdvanceDelayMs = useStepAdvanceDelay()
  const submittedRef = useRef(false)
  const timeoutRef = useRef(null)
  const countdownRef = useRef(null)

  const progress = (step / TOTAL_STEPS) * 100

  const selectService = useCallback(
    (service) => {
      setData((d) => ({ ...d, service }))
      setErrorMsg('')
      setTimeout(() => setStep(2), stepAdvanceDelayMs)
    },
    [stepAdvanceDelayMs],
  )

  const selectTimeline = useCallback(
    (timeline) => {
      setData((d) => ({ ...d, timeline }))
      setErrorMsg('')
      setTimeout(() => setStep(3), stepAdvanceDelayMs)
    },
    [stepAdvanceDelayMs],
  )

  const validateContact = () => {
    const name = sanitizeInput(data.name.trim())
    const email = sanitizeInput(data.email.trim())
    const phone = sanitizeInput(data.phone.trim())
    const address = sanitizeInput(data.address.trim())

    if (!name || !email || !phone || !address) {
      setErrorMsg('Please fill in all fields.')
      return null
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid phone number.')
      return null
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email.')
      return null
    }
    if (address.length < 5) {
      setErrorMsg('Please enter a valid property address.')
      return null
    }
    if (!data.privacyAccepted) {
      setErrorMsg('Please authorize contact to submit your request.')
      return null
    }
    return { name, email, phone, address }
  }

  const goToThankYou = (booked, appointmentDisplay, name) => {
    sessionStorage.setItem(
      'ics-thankyou',
      JSON.stringify({ booked, appointmentDisplay, name }),
    )
    sessionStorage.removeItem(PENDING_KEY)
    router.push('/thank-you')
  }

  const submitLead = useCallback(
    async ({ mode, appointmentAt = null }) => {
      if (submittedRef.current) return
      if (honeypot) {
        submittedRef.current = true
        goToThankYou(false, '', data.name)
        return
      }

      submittedRef.current = true
      setStatus('loading')
      setErrorMsg('')

      const id =
        submissionId ||
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `ics-${Date.now()}`)

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(buildPayload(data, id, mode, appointmentAt, honeypot)),
          cache: 'no-store',
        })

        const json = await res.json().catch(() => ({}))

        if (!res.ok) {
          submittedRef.current = false
          setStatus('idle')
          setErrorMsg(
            json.error ||
              `Unable to submit right now. Please call ${PHONE_PRIMARY} or try again shortly.`,
          )
          return
        }

        const display =
          mode === 'with_appointment' && appointmentAt
            ? formatAppointmentPst(appointmentAt)
            : ''

        goToThankYou(mode === 'with_appointment', display, sanitizeInput(data.name.trim()))
      } catch {
        submittedRef.current = false
        setStatus('idle')
        setErrorMsg(`Network error. Please try again or call ${PHONE_PRIMARY}.`)
      }
    },
    [data, honeypot, submissionId, router],
  )

  const clearSchedulingTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (countdownRef.current) clearInterval(countdownRef.current)
  }

  useEffect(() => {
    if (step !== 4) {
      clearSchedulingTimers()
      return
    }

    const id =
      submissionId ||
      (typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `ics-${Date.now()}`)
    if (!submissionId) setSubmissionId(id)

    sessionStorage.setItem(
      PENDING_KEY,
      JSON.stringify({
        data,
        submissionId: id,
        startedAt: Date.now(),
      }),
    )

    setTimeoutMinutesLeft(10)
    countdownRef.current = setInterval(() => {
      setTimeoutMinutesLeft((m) => Math.max(0, m - 1))
    }, 60_000)

    timeoutRef.current = setTimeout(() => {
      submitLead({ mode: 'form_only' })
    }, FORM_ONLY_TIMEOUT_MS)

    return clearSchedulingTimers
  }, [step, submissionId, data, submitLead])

  const continueToCalendar = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!data.service) {
      setErrorMsg('Please select a service.')
      setStep(1)
      return
    }
    if (!data.timeline) {
      setErrorMsg('Please select a timeline.')
      setStep(2)
      return
    }
    if (!validateContact()) return

    setStep(4)
  }

  const confirmAppointment = () => {
    if (!appointmentIso) {
      setErrorMsg('Please select an appointment time.')
      return
    }
    clearSchedulingTimers()
    submitLead({ mode: 'with_appointment', appointmentAt: appointmentIso })
  }

  return (
    <div className="rounded-2xl border border-ics-gray-200 bg-white p-5 shadow-2xl sm:p-6">
      <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-ics-gray-200">
        <div
          className="h-full rounded-full bg-ics-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-label={`Step ${step} of ${TOTAL_STEPS}`}
        />
      </div>

      <div className="mb-5 mt-4 text-center">
        <h3 className="font-display text-lg font-bold text-ics-black sm:text-xl">Get Your Free Roof Quote</h3>
        <p className="mt-1 text-xs text-ics-gray-600 sm:text-sm">
          {step < 4 ? 'Four quick steps — schedule your inspection.' : 'Choose a time in Pacific Time (PST)'}
        </p>
      </div>

      <div key={step} className="animate-form-step">
        <p className="mb-3 text-sm font-semibold text-ics-gray-900">{STEPS[step - 1].title}</p>

        {step === 1 && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((opt) => (
              <OptionTile
                key={opt.value}
                label={opt.label}
                iconKey={opt.icon}
                disabled={opt.disabled}
                selected={data.service === opt.value}
                onSelect={() => !opt.disabled && selectService(opt.value)}
              />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-2.5">
            {TIMELINE_OPTIONS.map((opt) => (
              <OptionTile
                key={opt.value}
                label={opt.label}
                iconKey={opt.icon}
                disabled={false}
                selected={data.timeline === opt.value}
                onSelect={() => selectTimeline(opt.value)}
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <form onSubmit={continueToCalendar} className="space-y-3">
            <label className="sr-only" aria-hidden>
              Website
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-ics-gray-600">Full Name</span>
              <input
                required
                autoComplete="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: sanitizeInput(e.target.value) })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-ics-gray-600">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: sanitizeInput(e.target.value) })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-ics-gray-600">Phone Number</span>
              <input
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: sanitizeInput(e.target.value) })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-ics-gray-600">
                <MapPin className="h-3.5 w-3.5 text-ics-primary" aria-hidden />
                Address
              </span>
              <input
                required
                autoComplete="street-address"
                value={data.address}
                onChange={(e) => setData({ ...data, address: sanitizeInput(e.target.value) })}
                className={inputClass}
                placeholder="Street address, city, CA"
                maxLength={200}
              />
            </label>
            <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-ics-gray-200 bg-ics-gray-50 p-3">
              <input
                type="checkbox"
                required
                checked={data.privacyAccepted}
                onChange={(e) => setData({ ...data, privacyAccepted: e.target.checked })}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-ics-gray-300 text-ics-primary focus:ring-ics-primary"
              />
              <span className="text-[11px] leading-relaxed text-ics-gray-600 sm:text-xs">
                {PRIVACY_CONSENT_TEXT}
              </span>
            </label>
            {errorMsg && (
              <p className="text-sm text-red-600" role="alert">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ics-primary text-sm font-bold text-white transition-all duration-300 hover:bg-ics-primary-dark"
            >
              Continue to Schedule Appointment
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-xs text-ics-gray-500">
              If you don&apos;t pick a time within ~{timeoutMinutesLeft || 1} min, we&apos;ll still
              send your quote request without an appointment.
            </p>
            <BookingCalendar
              selectedIso={appointmentIso}
              onSelect={setAppointmentIso}
              disabled={status === 'loading'}
            />
            {errorMsg && (
              <p className="text-sm text-red-600" role="alert">
                {errorMsg}
              </p>
            )}
            <button
              type="button"
              onClick={confirmAppointment}
              disabled={status === 'loading' || !appointmentIso}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ics-primary text-sm font-bold text-white transition-all duration-300 hover:bg-ics-primary-dark disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Confirming…
                </>
              ) : (
                'Confirm Appointment & Submit'
              )}
            </button>
          </div>
        )}
      </div>

      {errorMsg && step !== 3 && step !== 4 && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      {step > 1 && step !== 4 && (
        <div className="mt-4 border-t border-ics-gray-200 pt-3">
          <button
            type="button"
            onClick={() => {
              setErrorMsg('')
              setStep((s) => Math.max(1, s - 1))
            }}
            className="flex min-h-12 items-center text-sm font-semibold text-ics-gray-600 transition-colors duration-300 hover:text-ics-black"
          >
            ← Back
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-4 border-t border-ics-gray-200 pt-3">
          <button
            type="button"
            disabled={status === 'loading'}
            onClick={() => {
              setErrorMsg('')
              setStep(3)
            }}
            className="flex min-h-12 items-center text-sm font-semibold text-ics-gray-600 transition-colors duration-300 hover:text-ics-black disabled:opacity-50"
          >
            ← Back to contact info
          </button>
        </div>
      )}
    </div>
  )
}
