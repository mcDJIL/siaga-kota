import { useMemo, useState } from 'react'
import { HeroSection } from '../components/HeroSection'
import { SearchEducation } from '../components/SearchEducation'
import { CategorySection } from '../components/CategorySection'
import { ArticleGrid } from '../components/ArticleGrid'
import { QuizSection } from '../components/QuizSection'
import { VideoSection } from '../components/VideoSection'
import { NewsletterSection } from '../components/NewsletterSection'
import { ARTICLES, EDUCATION_CATEGORIES } from '../data/articles'

export function EducationPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    return ARTICLES.filter((article) => article.title.toLowerCase().includes(query))
  }, [searchQuery])

  const isSearching = searchQuery.trim().length > 0

  return (
    <>
      <HeroSection />
      <SearchEducation value={searchQuery} onChange={setSearchQuery} />

      <section className="bg-[#F8F9FF] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1440px]">
          {isSearching ? (
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-2xl font-semibold text-text-body">
                Hasil pencarian untuk &ldquo;{searchQuery}&rdquo;
              </h2>
              <ArticleGrid articles={filteredArticles} />
            </div>
          ) : (
            <div className="flex flex-col gap-10 lg:flex-row">
              {EDUCATION_CATEGORIES.map((category) => (
                <CategorySection
                  key={category.slug}
                  category={category}
                  articles={ARTICLES.filter((article) => article.category === category.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <QuizSection />
      <VideoSection />
      <NewsletterSection />
    </>
  )
}
