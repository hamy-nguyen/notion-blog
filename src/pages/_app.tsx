import '../styles/global.css'
import Footer from '../components/footer'

export default function MyApp({ Component, pageProps }) {
  return (
    // WHY: the flex column is what lets the footer sit at the bottom of a
    // short page. position:fixed would also pin it, but it would then float
    // over the text on long pages instead of ending them.
    <div className="app">
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
