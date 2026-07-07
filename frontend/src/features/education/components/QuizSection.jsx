import { QuizCard } from './QuizCard'
import { QUIZZES } from '../data/quizzes'

export function QuizSection() {
  return (
    <section className="bg-navy-light px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Uji Pengetahuanmu
          </h2>
          <p className="text-base leading-6 text-navy-lighter">
            Kumpulkan poin untuk setiap kuis yang berhasil diselesaikan!
          </p>
        </div>
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          {QUIZZES.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </section>
  )
}
