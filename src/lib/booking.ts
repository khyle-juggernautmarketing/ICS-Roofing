import { addDays, addMinutes } from 'date-fns'
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz'

export const BOOKING_TZ = 'America/Los_Angeles'
export const SLOT_INTERVAL_MIN = 15
export const BLOCK_DURATION_MIN = 90
export const BOOKING_START_HOUR = 8
/** Last bookable start (2:30 PM) so start + 90 min ends by 4:00 PM */
export const BOOKING_LAST_START_HOUR = 14
export const BOOKING_LAST_START_MINUTE = 30
export const MAX_DAYS_OUT = 3
export const FORM_ONLY_TIMEOUT_MS = 10 * 60 * 1000

export type BookingSlot = {
  startMs: number
  iso: string
  dateKey: string
  timeLabel: string
  dayLabel: string
}

export type StoredBooking = {
  startMs: number
  endMs: number
  submissionId: string
  email: string
  createdAt: string
}

export function intervalsOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd
}

export function isSlotBlockedByBookings(slotStartMs: number, bookings: StoredBooking[]): boolean {
  const slotEndMs = slotStartMs + SLOT_INTERVAL_MIN * 60_000
  return bookings.some((b) => intervalsOverlap(slotStartMs, slotEndMs, b.startMs, b.endMs))
}

export function getPstNow(): Date {
  return toZonedTime(new Date(), BOOKING_TZ)
}

export function getBookableDateKeys(): string[] {
  const pstNow = getPstNow()
  const keys: string[] = []

  for (let offset = 0; offset <= MAX_DAYS_OUT; offset++) {
    const day = addDays(pstNow, offset)
    if (formatInTimeZone(day, BOOKING_TZ, 'i') === '7') continue
    keys.push(formatInTimeZone(day, BOOKING_TZ, 'yyyy-MM-dd'))
  }

  return keys
}

export function getSlotsForDateKey(dateKey: string, now = new Date()): BookingSlot[] {
  const slots: BookingSlot[] = []
  let cursor = fromZonedTime(`${dateKey} 08:00:00`, BOOKING_TZ)
  const lastStart = fromZonedTime(
    `${dateKey} ${String(BOOKING_LAST_START_HOUR).padStart(2, '0')}:${String(BOOKING_LAST_START_MINUTE).padStart(2, '0')}:00`,
    BOOKING_TZ,
  )

  while (cursor.getTime() <= lastStart.getTime()) {
    if (cursor.getTime() > now.getTime()) {
      slots.push({
        startMs: cursor.getTime(),
        iso: cursor.toISOString(),
        dateKey,
        timeLabel: formatInTimeZone(cursor, BOOKING_TZ, 'h:mm a'),
        dayLabel: formatInTimeZone(cursor, BOOKING_TZ, 'EEE, MMM d'),
      })
    }
    cursor = addMinutes(cursor, SLOT_INTERVAL_MIN)
  }

  return slots
}

export function getAllBookableSlots(now = new Date()): BookingSlot[] {
  return getBookableDateKeys().flatMap((dateKey) => getSlotsForDateKey(dateKey, now))
}

export function formatAppointmentPst(iso: string): string {
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) return iso
  return formatInTimeZone(new Date(ms), BOOKING_TZ, "EEEE, MMMM d, yyyy 'at' h:mm a 'PST'")
}

export function isValidBookableSlot(iso: string, now = new Date()): boolean {
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) return false

  const slot = getAllBookableSlots(now).find((s) => s.startMs === ms)
  return Boolean(slot)
}

export function bookingEndMs(startMs: number): number {
  return startMs + BLOCK_DURATION_MIN * 60_000
}
