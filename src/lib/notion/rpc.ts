import fetch, { Response } from 'node-fetch'
import { API_ENDPOINT, NOTION_TOKEN } from './server-constants'

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

export default async function rpc(fnName: string, body: any) {
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not set in env')
  }
  const res = await fetch(`${API_ENDPOINT}/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: `token_v2=${NOTION_TOKEN}`,
      // WHY: node-fetch sends no User-Agent at all, and Cloudflare now sits in
      // front of this endpoint and 403s such requests with a challenge page
      // before Notion ever checks the token. The old symptom was a misleading
      // "have you run the create-table script?" on a perfectly valid token.
      'user-agent': USER_AGENT,
      accept: '*/*',
    },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return unwrapRecords(await res.json())
  } else {
    throw new Error(await getError(res))
  }
}

// WHY: Notion added a nesting level to every record since this client was
// written — what used to be {role, value: block} is now {spaceId, value:
// {value: block, role}}. Flattening here, at the one place responses enter the
// app, keeps every reader (getTableData, getPageData, renderers…) on the shape
// it was written against. Records already in the old shape are left alone, so
// this is a no-op if Notion ever reverts.
function unwrapRecords(json: any) {
  const flatten = (record: any) =>
    record && record.value && 'value' in record.value
      ? { ...record, value: record.value.value, role: record.value.role }
      : record

  for (const table of Object.values(json?.recordMap ?? {})) {
    if (!table || typeof table !== 'object') continue
    for (const [id, record] of Object.entries(table)) {
      table[id] = flatten(record)
    }
  }

  if (Array.isArray(json?.results)) {
    json.results = json.results.map(flatten)
  }

  return json
}

export async function getError(res: Response) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`
}

export function getJSONHeaders(res: Response) {
  return JSON.stringify(res.headers.raw())
}

export function getBodyOrNull(res: Response) {
  try {
    return res.text()
  } catch (err) {
    return null
  }
}

export function values(obj: any) {
  const vals: any = []

  Object.keys(obj).forEach(key => {
    vals.push(obj[key])
  })
  return vals
}
