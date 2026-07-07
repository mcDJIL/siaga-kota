import { ArticleCard } from './ArticleCard'
import { getCategoryInfo } from '../data/articles'

export function ArticleGrid({ articles }) {
  if (articles.length === 0) {
    return <p className="py-8 text-center text-base text-text-muted">Tidak ada artikel yang ditemukan.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          accentColor={getCategoryInfo(article.category)?.accentColor}
        />
      ))}
    </div>
  )
}
