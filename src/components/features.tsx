import {
  Lightbulb,
  BookOpen,
  Camera,
  GraduationCap,
  Podcast,
} from 'lucide-react'
import ExtLink from './ext-link'

// WHY: each entry is a destination rather than a label, so the row itself is
// the anchor. Wrapping a <div> in an <a> instead would give a tiny click
// target (icon + text only) and leave the row's padding dead to the mouse.
//
// WHY the platform field: every one of these leaves the site, and the label
// alone doesn't say where to. Naming the destination is also what lets two
// entries live on Notion without reading as duplicates.
const features = [
  {
    text: 'Reflections',
    platform: 'Substack',
    icon: Lightbulb,
    link: 'https://substack.com/@lovingkindness77/posts',
  },
  {
    text: 'Podcast',
    platform: 'Spotify',
    icon: Podcast,
    link: 'https://open.spotify.com/show/4ozGj9ucUpRJ2u0ruJGhtS',
  },
  {
    text: 'Books',
    platform: 'Notion',
    icon: BookOpen,
    link: 'https://polydactyl-dibble-8a4.notion.site/6a996176131f462c90766dc1ab4a81b3?v=2e3307dfe70b460280261ffd0f4c229c',
  },
  {
    text: 'Everyday Writings',
    platform: 'Instagram',
    icon: Camera,
    link: 'https://www.instagram.com/spklhm/',
  },
  {
    text: 'Learning Portfolio',
    platform: 'Notion',
    icon: GraduationCap,
    link: 'https://great-throat-34f.notion.site/Learning-Portfolio-43a532e5dbb34f9eab90895370f969ed',
  },
]

const Features = () => (
  <div className="features">
    {features.map(({ text, platform, icon: Icon, link }) => (
      <ExtLink className="feature" href={link} key={text}>
        {Icon && <Icon height={19} width={19} />}
        <h4>{text}</h4>
        <span className="featurePlatform">{platform}</span>
      </ExtLink>
    ))}
  </div>
)

export default Features
