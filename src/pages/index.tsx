import Header from '../components/header'
import Features from '../components/features'
import sharedStyles from '../styles/shared.module.css'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <h1>Grace's Miraculous Ordinaries</h1>
        <h2>Reflections and notes on what I observe, read, and watch.</h2>

        <Features />

        <div className="explanation">
          <p>
            This is a slow archive — somewhere to set things down before they
            slip. Most of what ends up here starts small: a note in the margin
            of a book, a half-thought on a walk, a scene I couldn't stop turning
            over. What survives a second reading gets written out properly.
          </p>

          <p>
            None of it is meant to be finished or authoritative. These are
            working notes, and they live wherever each kind of writing is most
            at home — longer reflections on Substack, a reading log in Notion,
            everyday fragments on Instagram, and what I'm formally studying in
            my learning portfolio. The four links above will take you to each.
          </p>
        </div>
      </div>
    </>
  )
}
