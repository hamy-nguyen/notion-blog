import Link from 'next/link'
import Header from '../components/header'
import Features from '../components/features'
import sharedStyles from '../styles/shared.module.css'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <h1>Miraculous Ordinaries</h1>
        {/* WHY: still an h2 for document outline, but the tagline class carries
            the standfirst level. Without it this inherits the section-heading
            size, which is the level used for headings inside a post. */}
        <h2 className="tagline">
          Reflections and notes on what I observe, read, and watch.
        </h2>

        {/* WHY: the intro used to sit below the four link cards, so the page
            showed you the destinations before saying what any of it was. It
            reads top to bottom now: what this is, then what to read here,
            then where the rest lives. */}
        <div className="explanation">
          <p>
            This is a slow archive, somewhere to set things down before they
            slip. Most of what ends up here starts small: a note in the margin
            of a book, a half-thought on a walk, a scene I couldn't stop turning
            over. Sooner or later the ones that stay with me get written out.
          </p>

          <p>
            Nothing here is a draft waiting on a better version. Each piece is
            what I meant it to be, in whatever voice it came out in. They live
            wherever each kind of writing is most at home, and the links below
            will take you to each.
          </p>
        </div>

        <Link href="/blog" className="readHere">
          Read what's written here<span>→</span>
        </Link>

        <div className="sectionLabel">Elsewhere</div>

        <Features />
      </div>
    </>
  )
}
