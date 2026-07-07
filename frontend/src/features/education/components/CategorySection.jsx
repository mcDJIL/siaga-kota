import { motion } from 'framer-motion'
import { Recycle, Waves } from 'lucide-react'
import { ArticleCard } from './ArticleCard'
import { cn } from '../../../lib/cn'

const CATEGORY_ICONS = {
  sampah: Recycle,
  banjir: Waves,
}

export function CategorySection({ category, articles }) {
  const Icon = CATEGORY_ICONS[category.slug]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col gap-6"
    >
      <div className="flex items-center gap-4">
        <span className={cn('flex shrink-0 items-center justify-center rounded-xl p-3', category.iconBg)}>
          <Icon className={cn('h-6 w-6', category.iconColor)} aria-hidden="true" />
        </span>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-text-body sm:text-[32px]">
          {category.label}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} accentColor={category.accentColor} />
        ))}
      </div>
    </motion.div>
  )
}
