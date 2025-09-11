import { getStore } from '@netlify/blobs'

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const body = JSON.parse(event.body || '{}')
  if (!body.doctor || body.amount == null) {
    return { statusCode: 400, body: '缺少欄位（doctor / amount）' }
  }
  const store = getStore('records')
  const id = crypto.randomUUID()
  const item = {
    id,
    doctor: String(body.doctor),
    department: body.department ? String(body.department) : '',
    amount: Number(body.amount),
    happened_on: body.happened_on || new Date().toISOString().slice(0,10),
    created_at: new Date().toISOString()
  }
  await store.setJSON(id, item)
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ok:true, item })
  }
}
