export interface PageRecord {
  id: string
  slug: string
  title: string
  puck_data: string
  created: string
  updated: string
}

// PocketBase removed — editor is disabled in production.
// These stubs allow the editor page to compile without the pocketbase dependency.

export async function getPages(): Promise<PageRecord[]> {
  return []
}

export async function getPageBySlug(_slug: string): Promise<PageRecord | null> {
  return null
}

export async function savePage(_slug: string, _title: string, _puckData: any): Promise<PageRecord> {
  throw new Error('Editor is disabled')
}

export async function deletePage(_slug: string): Promise<void> {}

export function parsePuckData(record: PageRecord | null): any {
  if (!record?.puck_data) return null
  try {
    return JSON.parse(record.puck_data)
  } catch {
    return null
  }
}
