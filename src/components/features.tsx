import { Lightbulb, BookOpen, Camera, GraduationCap } from 'lucide-react'
import ExtLink from './ext-link'

// WHY: each entry is now a destination rather than a label, so the card itself
// is the anchor. Wrapping a <div> in an <a> instead would give a tiny click
// target (icon + text only) and leave the card's padding dead to the mouse.
const features = [
  {
    text: 'Reflections',
    icon: Lightbulb,
    link: 'https://substack.com/@lovingkindness77/posts',
  },
  {
    text: 'Books',
    icon: BookOpen,
    link: 'https://polydactyl-dibble-8a4.notion.site/6a996176131f462c90766dc1ab4a81b3?v=2e3307dfe70b460280261ffd0f4c229c',
  },
  {
    text: 'Everyday Writings',
    icon: Camera,
    link: 'https://www.instagram.com/spklhm/',
  },
  {
    text: 'Learning Portfolio',
    icon: GraduationCap,
    link: 'https://great-throat-34f.notion.site/Learning-Portfolio-43a532e5dbb34f9eab90895370f969ed',
  },
]

const Features = () => (
  <div className="features">
    {features.map(({ text, icon: Icon, link }) => (
      <ExtLink className="feature" href={link} key={text}>
        {Icon && <Icon height={24} width={24} />}
        <h4>{text}</h4>
      </ExtLink>
    ))}
  </div>
)

export default Features
