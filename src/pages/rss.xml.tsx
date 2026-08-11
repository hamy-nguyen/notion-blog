import { GetServerSideProps } from 'next'
import generateRssXml from '../lib/build-rss'

// WHY: this page never renders. getServerSideProps writes the XML straight to
// the response and ends it, but Next still requires a default export for any
// file under pages/, so this returns null.
export default function Rss() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // WHY: deriving the origin from the request means preview deploys and
  // localhost each describe themselves correctly, with no per-environment
  // config. SITE_URL still wins when set, for a custom domain fronting a
  // platform hostname.
  const proto = (req.headers['x-forwarded-proto'] as string) || 'http'
  const origin = process.env.SITE_URL || `${proto}://${req.headers.host}`

  try {
    const xml = await generateRssXml(origin)
    res.setHeader('content-type', 'application/rss+xml; charset=utf-8')
    // WHY: the feed is rebuilt per request, so cache it at the edge for an
    // hour and keep serving the stale copy while it refreshes. Readers poll
    // far more often than the blog changes.
    res.setHeader(
      'cache-control',
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    )
    res.write(xml)
  } catch (err) {
    // WHY: a Notion outage should return an honest 503 that feed readers will
    // retry, not a 200 carrying an empty feed, which readers would treat as
    // "every post was deleted".
    console.error('Failed to build rss.xml:', err)
    res.statusCode = 503
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.write('Feed temporarily unavailable')
  }

  res.end()
  return { props: {} }
}
