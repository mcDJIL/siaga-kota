import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../lib/cn'

export function ArticleCard({ article, accentColor = 'text-brand-green' }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex flex-1 flex-col gap-1 rounded-xl border border-transparent bg-white p-4 shadow-[0_4px_20px_0_rgba(26,54,93,0.08)]"
    >
      <Link to={`/education/article/${article.slug}`} className="flex flex-col gap-1" aria-label={article.title}>
        <div className="aspect-[103/50] w-full overflow-hidden rounded-lg">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        </div>
        <h3 className="pt-3 text-xl leading-7 font-semibold text-text-body">{article.title}</h3>
        <p className="text-sm leading-5 font-medium tracking-[0.14px] text-text-muted">{article.excerpt}</p>
        <span className={cn('flex items-center gap-1 pt-3 text-base', accentColor)}>
          Baca Selengkapnya
          <ArrowRight className="h-[10px] w-[10px]" aria-hidden="true" />
        </span>
      </Link>
    </motion.article>
  )
}
