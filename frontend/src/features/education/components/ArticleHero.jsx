import { motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import { Badge } from '../../../components/ui/Badge'
import { getCategoryInfo } from '../data/articles'

export function ArticleHero({ article }) {
  const category = getCategoryInfo(article.category)
  const formattedDate = new Date(article.publishDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      <div className="aspect-[16/7] w-full overflow-hidden rounded-2xl">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-4">
        <Badge variant={category.slug === 'sampah' ? 'success' : 'neutral'}>{category.label}</Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" aria-hidden="true" />
            {article.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {article.readingTime}
          </span>
        </div>
      </div>
    </motion.header>
  )
}
