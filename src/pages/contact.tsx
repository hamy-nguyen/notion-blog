import Header from '../components/header'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Envelope from '../components/svgs/envelope'
import ExtLink from '../components/ext-link'

const contacts = [
  {
    Comp: Envelope,
    alt: 'email',
    link: 'mailto:mynguyenha.work@gmail.com',
  },
  {
    Comp: GitHub,
    alt: 'github',
    link: 'https://github.com/hamy-nguyen',
  },
]

export default function Contact() {
  return (
    <>
      <Header titlePre="Contact" />
      <div className={sharedStyles.layout}>
        <h1 style={{ marginTop: 0 }}>Contact</h1>

        <div className={contactStyles.name}>
          Say hello, or tell me what you've been turning over.
        </div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
