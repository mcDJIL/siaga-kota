import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { ArticleHero } from '../components/ArticleHero'
import { ArticleContent } from '../components/ArticleContent'
import { RelatedArticles } from '../components/RelatedArticles'
import { ShareButton } from '../components/ShareButton'
import { getArticleBySlug, getRelatedArticles } from '../data/articles'

export function ArticleDetailPage() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-navy">Artikel tidak ditemukan</h1>
        <p className="text-base text-text-muted">Artikel yang Anda cari mungkin sudah dipindahkan atau dihapus.</p>
        <Button as={Link} to="/education" variant="primary" size="sm">
          Kembali ke Edukasi
        </Button>
      </div>
    )
  }

  const relatedArticles = getRelatedArticles(article)

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-8 sm:py-16">
      <div className="flex items-center justify-between">
        <Button as={Link} to="/education" variant="ghost" size="sm" aria-label="Kembali ke halaman edukasi">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali
        </Button>
        <ShareButton title={article.title} />
      </div>

      <ArticleHero article={article} />
      <ArticleContent content={article.content} />
      <RelatedArticles articles={relatedArticles} />
    </article>
  )
}
