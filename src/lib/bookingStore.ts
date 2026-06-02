import { kv } from '@vercel/kv'
import {
  BOOKING_TZ,
  bookingEndMs,
  getAllBookableSlots,
  isSlotBlockedByBookings,
  isValidBookableSlot,
  type StoredBooking,
} from '@/lib/booking'
import { formatInTimeZone } from 'date-fns-tz'

const BOOKINGS_KEY = 'ics:bookings:v1'
const SUBMISSIONS_KEY = 'ics:submissions:v1'

declare global {
  // eslint-disable-next-line no-var
  var __icsBookings: StoredBooking[] | undefined
  // eslint-disable-next-line no-var
  var __icsSubmissions: Set<string> | undefined
}

function hasKv(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function memoryBookings(): StoredBooking[] {
  if (!globalThis.__icsBookings) globalThis.__icsBookings = []
  return globalThis.__icsBookings
}

function memorySubmissions(): Set<string> {
  if (!globalThis.__icsSubmissions) globalThis.__icsSubmissions = new Set()
  return globalThis.__icsSubmissions
}

function pruneBookings(bookings: StoredBooking[]): StoredBooking[] {
  const cutoff = Date.now() - 96 * 60 * 60 * 1000
  return bookings.filter((b) => b.endMs > cutoff)
}

export async function listBookings(): Promise<StoredBooking[]> {
  if (hasKv()) {
    const data = await kv.get<StoredBooking[]>(BOOKINGS_KEY)
    return pruneBookings(data ?? [])
  }
  return pruneBookings(memoryBookings())
}

async function persistBookings(bookings: StoredBooking[]): Promise<void> {
  const pruned = pruneBookings(bookings)
  if (hasKv()) {
    await kv.set(BOOKINGS_KEY, pruned)
    return
  }
  globalThis.__icsBookings = pruned
}

export async function getBlockedSlotIsos(): Promise<string[]> {
  const bookings = await listBookings()
  const blocked = new Set<string>()
  const slots = getAllBookableSlots()

  for (const slot of slots) {
    if (isSlotBlockedByBookings(slot.startMs, bookings)) {
      blocked.add(slot.iso)
    }
  }

  return [...blocked]
}

export async function reserveBooking(params: {
  startIso: string
  submissionId: string
  email: string
}): Promise<{ ok: true; booking: StoredBooking } | { ok: false; error: string }> {
  const now = new Date()
  if (!isValidBookableSlot(params.startIso, now)) {
    return { ok: false, error: 'Selected time is not available.' }
  }

  const startMs = Date.parse(params.startIso)
  const endMs = bookingEndMs(startMs)
  const bookings = await listBookings()

  if (isSlotBlockedByBookings(startMs, bookings)) {
    return { ok: false, error: 'That time was just booked. Please choose another slot.' }
  }

  const booking: StoredBooking = {
    startMs,
    endMs,
    submissionId: params.submissionId,
    email: params.email,
    createdAt: now.toISOString(),
  }

  bookings.push(booking)
  await persistBookings(bookings)

  return { ok: true, booking }
}

export async function claimSubmission(submissionId: string): Promise<boolean> {
  if (!submissionId) return false

  if (hasKv()) {
    const exists = await kv.sismember(SUBMISSIONS_KEY, submissionId)
    return !exists
  }

  return !memorySubmissions().has(submissionId)
}

export async function markSubmissionSent(submissionId: string): Promise<void> {
  if (!submissionId) return

  if (hasKv()) {
    await kv.sadd(SUBMISSIONS_KEY, submissionId)
    return
  }

  memorySubmissions().add(submissionId)
}

export async function releaseBooking(submissionId: string): Promise<void> {
  const bookings = await listBookings()
  const next = bookings.filter((b) => b.submissionId !== submissionId)
  if (next.length !== bookings.length) {
    await persistBookings(next)
  }
}

export function formatBookingForWebhook(iso: string): {
  appointmentAt: string
  appointmentAtPst: string
  appointmentEndPst: string
  appointmentTimezone: string
} {
  const startMs = Date.parse(iso)
  const endMs = bookingEndMs(startMs)
  return {
    appointmentAt: new Date(startMs).toISOString(),
    appointmentAtPst: formatInTimeZone(new Date(startMs), BOOKING_TZ, "yyyy-MM-dd'T'HH:mm:ss"),
    appointmentEndPst: formatInTimeZone(new Date(endMs), BOOKING_TZ, "yyyy-MM-dd'T'HH:mm:ss"),
    appointmentTimezone: BOOKING_TZ,
  }
}
