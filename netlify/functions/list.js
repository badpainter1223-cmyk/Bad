import { getStore } from '@netlify/blobs'

export async function handler() {
  const store = getStore('records')
  const keys = await store.list()
  const items = []
  for (const k of keys.blobs) {
    const obj = await store.getJSON(k.key)
    if (obj) items.push(obj)
  }
  items.sort((a,b) => (b.created_at||'').localeCompare(a.created_at||''))
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(items)
  }
}
