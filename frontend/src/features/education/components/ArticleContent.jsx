import { Lightbulb, Quote } from 'lucide-react'

function ContentBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="font-heading text-2xl font-semibold text-text-body">{block.text}</h2>
    case 'paragraph':
      return <p className="text-base leading-7 text-text-muted">{block.text}</p>
    case 'image':
      return (
        <div className="overflow-hidden rounded-xl">
          <img src={block.src} alt={block.alt} className="w-full object-cover" />
        </div>
      )
    case 'list':
      return (
        <ul className="flex flex-col gap-2 pl-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-7 text-text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="flex gap-3 border-l-4 border-brand-green bg-bg-soft p-6 text-lg leading-7 font-medium text-text-body italic">
          <Quote className="h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
          {block.text}
        </blockquote>
      )
    case 'highlight':
      return (
        <div className="rounded-xl bg-brand-green-light/40 p-6">
          <p className="mb-1 text-sm font-bold tracking-[0.14px] text-brand-green-dark uppercase">{block.title}</p>
          <p className="text-base leading-7 text-text-body">{block.text}</p>
        </div>
      )
    case 'tip':
      return (
        <div className="flex gap-3 rounded-xl bg-bg-blue-lighter p-6">
          <Lightbulb className="h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
          <div>
            <p className="mb-1 text-sm font-bold tracking-[0.14px] text-navy uppercase">{block.title}</p>
            <p className="text-base leading-7 text-text-body">{block.text}</p>
          </div>
        </div>
      )
    default:
      return null
  }
}

export function ArticleContent({ content }) {
  return (
    <div className="flex flex-col gap-6">
      {content.map((block, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ContentBlock key={index} block={block} />
      ))}
    </div>
  )
}
