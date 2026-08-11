import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'Contact', page: '/contact' },
]

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{`${titlePre ? `${titlePre} |` : ''} Grace's Ordinaries`}</title>
        <meta
          name="description"
          content="Reflections and notes on what I observe, read, and watch."
        />
        {/* WHY: no og:image/twitter:image tags at all, rather than tags
            pointing at a missing file. A broken image URL makes some scrapers
            render an empty preview card; with no tag they fall back to the
            title and description, which is the better degraded state.
            Add a real image here when there is one. */}
        <meta name="og:title" content="Grace's Ordinaries" />
        <meta
          name="og:description"
          content="Reflections and notes on what I observe, read, and watch."
        />
        <meta name="twitter:card" content="summary" />
        {/* WHY: an SVG favicon renders the emoji with whatever emoji font the
            reader's OS has, so there's no image file to keep in sync. Older
            browsers that ignore SVG icons just fall back to no favicon, which
            is what the site had anyway. */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* WHY: this is how feed readers discover the feed from any page —
            without it, subscribing means knowing to type /rss.xml by hand. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Miraculous Ordinaries"
          href="/rss.xml"
        />
      </Head>
      <Link href="/" className={styles.mark} aria-label="Home">
        <span aria-hidden="true">⋆｡˚ 𓆝⋆｡˚</span>
      </Link>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link
                href={page}
                className={pathname === page ? 'active' : undefined}
              >
                {label}
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
