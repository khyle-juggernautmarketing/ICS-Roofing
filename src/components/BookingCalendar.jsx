'use client'

import { Calendar, Clock, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BOOKING_TZ,
  FORM_ONLY_TIMEOUT_MS,
  getAllBookableSlots,
} from '@/lib/booking'

export function BookingCalendar({ selectedIso, onSelect, disabled }) {
  const [blocked, setBlocked] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const slots = useMemo(() => getAllBookableSlots(), [refreshKey])

  const slotsByDate = useMemo(() => {
    const map = new Map()
    for (const slot of slots) {
      if (!map.has(slot.dateKey)) map.set(slot.dateKey, [])
      map.get(slot.dateKey).push(slot)
    }
    return map
  }, [slots])

  const loadBlocked = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' })
      if (res.ok) {
        const json = await res.json()
        setBlocked(new Set(json.blocked ?? []))
      }
    } catch {
      /* keep previous blocked set */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBlocked()
    const id = setInterval(loadBlocked, 30_000)
    return () => clearInterval(id)
  }, [loadBlocked, refreshKey])

  const selectedDateKey = selectedIso
    ? slots.find((s) => s.iso === selectedIso)?.dateKey
    : slotsByDate.keys().next().value

  const [activeDate, setActiveDate] = useState(selectedDateKey ?? '')

  useEffect(() => {
    if (!activeDate && slotsByDate.size > 0) {
      setActiveDate(slotsByDate.keys().next().value)
    }
  }, [activeDate, slotsByDate])

  const daySlots = activeDate ? slotsByDate.get(activeDate) ?? [] : []

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-ics-primary/20 bg-ics-primary-light/60 p-3 text-xs text-ics-gray-800 sm:text-sm">
        <p className="flex items-center gap-2 font-semibold text-ics-black">
          <Clock className="h-4 w-4 shrink-0 text-ics-primary" aria-hidden />
          Pacific Time (PST/PDT) · Mon–Sat · 8:00 AM – 4:00 PM
        </p>
        <p className="mt-1 text-ics-gray-600">
          15-minute slots · Book up to 3 days ahead · Each visit reserves 90 minutes on our calendar
        </p>
      </div>

      {loading && daySlots.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center gap-2 text-sm text-ics-gray-600">
          <Loader2 className="h-5 w-5 animate-spin text-ics-primary" aria-hidden />
          Loading availability…
        </div>
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[...slotsByDate.keys()].map((dateKey) => {
              const sample = slotsByDate.get(dateKey)?.[0]
              const availableCount = (slotsByDate.get(dateKey) ?? []).filter(
                (s) => !blocked.has(s.iso),
              ).length
              return (
                <button
                  key={dateKey}
                  type="button"
                  disabled={disabled || availableCount === 0}
                  onClick={() => setActiveDate(dateKey)}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all sm:text-sm ${
                    activeDate === dateKey
                      ? 'border-ics-primary bg-ics-primary text-white'
                      : 'border-ics-gray-200 bg-white text-ics-gray-800 hover:border-ics-primary/50'
                  } ${availableCount === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <span className="block">{sample?.dayLabel}</span>
                  <span
                    className={`mt-0.5 block text-[10px] font-normal ${activeDate === dateKey ? 'text-white/90' : 'text-ics-gray-500'}`}
                  >
                    {availableCount} open
                  </span>
                </button>
              )
            })}
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ics-gray-600">
              <Calendar className="h-3.5 w-3.5 text-ics-primary" aria-hidden />
              Select a time ({BOOKING_TZ.replace('_', ' ')})
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {daySlots.map((slot) => {
                const isBlocked = blocked.has(slot.iso)
                const isSelected = selectedIso === slot.iso
                return (
                  <button
                    key={slot.iso}
                    type="button"
                    disabled={disabled || isBlocked}
                    onClick={() => {
                      onSelect(slot.iso)
                      setRefreshKey((k) => k + 1)
                    }}
                    className={`min-h-11 rounded-lg border px-2 py-2 text-xs font-semibold transition-all sm:text-sm ${
                      isBlocked
                        ? 'cursor-not-allowed border-ics-gray-100 bg-ics-gray-50 text-ics-gray-400 line-through'
                        : isSelected
                          ? 'border-ics-primary bg-ics-primary text-white ring-2 ring-ics-primary/25'
                          : 'border-ics-gray-200 bg-white text-ics-gray-900 hover:border-ics-primary/60'
                    }`}
                  >
                    {slot.timeLabel}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => loadBlocked()}
        disabled={disabled}
        className="text-xs font-semibold text-ics-primary underline underline-offset-2 hover:text-ics-primary-dark"
      >
        Refresh availability
      </button>
    </div>
  )
}

export { FORM_ONLY_TIMEOUT_MS }
