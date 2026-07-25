import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret') || request.headers.get('x-revalidate-secret')

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Invalid revalidation secret' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const tag = typeof body.tag === 'string' ? body.tag : 'cms'
  const path = typeof body.path === 'string' ? body.path : '/'

  revalidateTag(tag)
  revalidatePath(path)

  return NextResponse.json({ ok: true, revalidated: { tag, path } })
}
