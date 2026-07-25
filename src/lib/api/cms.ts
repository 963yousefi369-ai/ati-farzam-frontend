import type { CmsPage, CmsSiteSettings } from '@/lib/cms/types'

const isServer = typeof window === 'undefined'
const API_ORIGIN = isServer
  ? process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  : ''

async function cmsRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_ORIGIN}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    next: { revalidate: 60, tags: ['cms', ...(init?.next?.tags ?? [])] },
  })

  if (!res.ok) {
    throw new Error(`CMS request failed ${res.status}: ${path}`)
  }

  return res.json()
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  try {
    return await cmsRequest<CmsPage>(`/api/pages/${slug}/`, {
      next: { revalidate: 60, tags: ['cms', `cms-page-${slug}`] },
    })
  } catch {
    return null
  }
}

export async function getCmsSiteSettings(): Promise<CmsSiteSettings | null> {
  try {
    return await cmsRequest<CmsSiteSettings>('/api/site-settings/', {
      next: { revalidate: 60, tags: ['cms', 'cms-site-settings'] },
    })
  } catch {
    return null
  }
}
