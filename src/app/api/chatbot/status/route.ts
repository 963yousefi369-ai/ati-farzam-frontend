import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL || process.env.INTERNAL_API_URL || 'https://farzam.runflare.run'

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/api/chatbot/status`, {
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.text()
    return new NextResponse(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return NextResponse.json({ is_active: false, welcome_message: '', quick_replies: [] })
  }
}
