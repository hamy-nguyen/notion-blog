import { getBlogLink } from './blog-helpers'
import getNotionUsers from './notion/getNotionUsers'
import getBlogIndex from './notion/getBlogIndex'

interface Post {
  // WHY: Authors is the person column on the Notion database and holds user
  // ids, not names — the same field pages/blog/[slug].tsx resolves. There is
  // no CreatedBy column, which is what the original feed code read.
  Authors?: string[]
  Slug: string
  Page: string
  Excerpt?: string
  Content?: string
  Date: string
  id?: string
  preview?: any[]
}

// WHY: post titles and excerpts are arbitrary prose from Notion, so an
// ampersand or a quote in one of them is enough to make the whole feed
// unparseable. Every interpolated value goes through here.
const escapeXml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// WHY: CDATA ends at the first ]]>, so post content containing that sequence
// would close the block early and spill markup into the document. Splitting it
// across two CDATA sections preserves the literal text.
const escapeCdata = (value: unknown) =>
  String(value ?? '').replace(/]]>/g, ']]]]><![CDATA[>')

const toPubDate = (value: string) => {
  const date = new Date(Number(value) || value)
  return isNaN(date.getTime()) ? '' : date.toUTCString()
}

/**
 * Builds the RSS document. `origin` is the absolute base URL every link in the
 * feed hangs off, e.g. https://example.com — RSS has no notion of relative
 * paths, so the caller has to say where the site actually lives.
 */
export async function generateRssXml(origin: string): Promise<string> {
  const postsTable = (await getBlogIndex(false)) as Record<string, Post>
  const authorsToGet = new Set<string>()

  Object.values(postsTable).forEach((post) => {
    ;(post.Authors || []).forEach((id) => authorsToGet.add(id))
  })

  const { users } = await getNotionUsers([...authorsToGet])

  const items = Object.values(postsTable)
    .filter((post) => post.Slug)
    .sort((a, b) => Number(b.Date) - Number(a.Date))
    .map((post) => {
      const url = `${origin}${getBlogLink(post.Slug)}`
      // WHY: a deleted Notion user, or one the token can't resolve, used to
      // throw and take the entire feed down with it. dc:creator is optional in
      // RSS, so an unknown author costs one tag, not the document.
      const authors = (post.Authors || [])
        .map((id) => users[id]?.full_name)
        .filter(Boolean)
      const pubDate = toPubDate(post.Date)

      return `
      <item>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <title>${escapeXml(post.Page)}</title>
        <link>${escapeXml(url)}</link>
        <description>${escapeXml(post.Excerpt || '')}</description>
        ${
          post.Content
            ? `<content:encoded><![CDATA[${escapeCdata(
                post.Content
              )}]]></content:encoded>`
            : ''
        }
        ${authors
          .map((name) => `<dc:creator>${escapeXml(name)}</dc:creator>`)
          .join('')}
        ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Miraculous Ordinaries</title>
    <link>${escapeXml(origin)}</link>
    <description>Reflections and notes on what I observe, read, and watch.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(
      `${origin}/rss.xml`
    )}" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`
}

export default generateRssXml
