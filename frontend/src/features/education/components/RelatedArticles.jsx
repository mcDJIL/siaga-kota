import { ArticleGrid } from './ArticleGrid'

export function RelatedArticles({ articles }) {
  if (articles.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-heading text-2xl font-semibold text-text-body">Artikel Terkait</h2>
      <ArticleGrid articles={articles} />
    </section>
  )
}
