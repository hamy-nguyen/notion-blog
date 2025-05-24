import { Lightbulb, BookOpen, Podcast, Youtube } from 'lucide-react'

const features = [
  {
    text: 'Reflections',
    icon: Lightbulb,
  },
  {
    text: 'Books',
    icon: BookOpen,
  },
  {
    text: 'Youtube Videos',
    icon: Youtube,
  },
  {
    text: 'Podcasts',
    icon: Podcast,
  },
]

const Features = () => (
  <div className="features">
    {features.map(({ text, icon: Icon }) => (
      <div className="feature" key={text}>
        {Icon && <Icon height={24} width={24} />}
        <h4>{text}</h4>
      </div>
    ))}
  </div>
)

export default Features
