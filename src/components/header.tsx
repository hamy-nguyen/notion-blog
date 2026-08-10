import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
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
        <meta name="og:description" content="Reflections and notes on what I observe, read, and watch." />
        <meta name="twitter:card" content="summary" />
      </Head>
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
