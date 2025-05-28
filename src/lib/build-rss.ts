import { promises as fs } from 'fs'
import path from 'path'
import { getBlogLink } from './blog-helpers'
import getNotionUsers from './notion/getNotionUsers'
import getBlogIndex from './notion/getBlogIndex'
import getTableData from './notion/getTableData'

const DOMAIN = 'https://notion-blog-demo.transitivebullsh.it'

interface Post {
  CreatedBy: string
  Slug: string
  Page: string
  Excerpt?: string
  Content: string
  Date: string
  id?: string
  preview?: any[]
}

interface NotionUser {
  full_name: string
}

export async function generateRss() {
  const postsTable = await getBlogIndex()
  const authorsToGet = new Set<string>()
  const posts = postsTable as Record<string, Post>

  Object.values(posts).forEach(post => {
    const createdBy = post.CreatedBy
    if (createdBy) {
      authorsToGet.add(createdBy)
    }
  })

  const { users } = await getNotionUsers([...authorsToGet])

  const rss = `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Transitive Bullshit</title>
        <link>${DOMAIN}</link>
        <description>Personal site of Travis Fischer – I'm a developer, writer, and creator.</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
        ${Object.values(posts)
          .map(post => {
            const author = users[post.CreatedBy]
            if (!author) {
              throw new Error(`Author not found for ${post.Slug}`)
            }

            return `
              <item>
                <guid>${DOMAIN}${getBlogLink(post.Slug)}</guid>
                <title>${post.Page}</title>
                <link>${DOMAIN}${getBlogLink(post.Slug)}</link>
                <description>${post.Excerpt || ''}</description>
                <content:encoded><![CDATA[${post.Content}]]></content:encoded>
                <dc:creator>${author.full_name}</dc:creator>
                <pubDate>${new Date(post.Date).toUTCString()}</pubDate>
              </item>
            `
          })
          .join('')}
      </channel>
    </rss>
  `.trim()

  const publicDir = path.join(process.cwd(), 'public')
  await fs.mkdir(publicDir, { recursive: true })
  await fs.writeFile(path.join(publicDir, 'rss.xml'), rss)
}

export default generateRss
