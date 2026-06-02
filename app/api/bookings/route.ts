import { NextResponse } from 'next/server'
import { getBlockedSlotIsos } from '@/lib/bookingStore'
import { isAllowedLeadRequest } from '@/lib/requestSecurity'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
}

export async function GET(request: Request) {
  if (!isAllowedLeadRequest(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: JSON_HEADERS })
  }

  try {
    const blocked = await getBlockedSlotIsos()
    return NextResponse.json({ blocked }, { headers: JSON_HEADERS })
  } catch {
    return NextResponse.json({ error: 'Unable to load availability' }, { status: 500, headers: JSON_HEADERS })
  }
}
