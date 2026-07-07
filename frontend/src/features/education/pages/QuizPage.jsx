import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { QuizProgress } from '../components/QuizProgress'
import { QuizQuestion } from '../components/QuizQuestion'
import { QUIZZES, getQuizById } from '../data/quizzes'

function QuizSelector() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-8">
      <h1 className="font-heading text-3xl font-semibold text-navy">Pilih Kuis</h1>
      <p className="text-base text-text-muted">Pilih salah satu kuis di bawah ini untuk mulai menguji pengetahuanmu.</p>
      <div className="flex flex-col gap-4">
        {QUIZZES.map((quiz) => (
          <Link
            key={quiz.id}
            to={`/education/quiz/${quiz.id}`}
            className="flex flex-col gap-2 rounded-xl border border-border-muted p-6 hover:border-brand-green"
          >
            <span className="w-fit rounded-full bg-brand-green-light px-3 py-1 text-xs font-bold tracking-[0.5px] text-brand-green-dark uppercase">
              +{quiz.points} Poin
            </span>
            <h2 className="font-heading text-xl font-semibold text-text-body">{quiz.title}</h2>
            <p className="text-base text-text-muted">{quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quiz = id ? getQuizById(id) : null

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(() => (quiz ? Array(quiz.questions.length).fill(null) : []))

  if (id && !quiz) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-navy">Kuis tidak ditemukan</h1>
        <Button as={Link} to="/education/quiz" variant="primary" size="sm">
          Lihat Semua Kuis
        </Button>
      </div>
    )
  }

  if (!quiz) return <QuizSelector />

  const totalQuestions = quiz.questions.length
  const currentQuestion = quiz.questions[currentIndex]
  const isLastQuestion = currentIndex === totalQuestions - 1
  const hasAnswer = answers[currentIndex] !== null

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = optionIndex
      return next
    })
  }

  const handleFinish = () => {
    navigate(`/education/quiz/${quiz.id}/result`, { state: { quizId: quiz.id, answers } })
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-8 sm:py-16">
      <header className="flex flex-col gap-2">
        <span className="text-sm font-medium text-brand-green">Kuis Edukasi</span>
        <h1 className="font-heading text-2xl font-semibold text-navy sm:text-3xl">{quiz.title}</h1>
        <p className="text-sm text-text-muted">Skor: akan ditampilkan setelah kuis selesai</p>
      </header>

      <QuizProgress current={currentIndex + 1} total={totalQuestions} />

      <QuizQuestion question={currentQuestion} selectedIndex={answers[currentIndex]} onSelect={handleSelect} />

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          disabled={currentIndex === 0}
          aria-label="Pertanyaan sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Sebelumnya
        </Button>

        {isLastQuestion ? (
          <Button variant="primary" size="sm" onClick={handleFinish} disabled={!hasAnswer} aria-label="Selesaikan kuis">
            <Flag className="h-4 w-4" aria-hidden="true" />
            Selesai
          </Button>
        ) : (
          <Button
            variant="navy"
            size="sm"
            onClick={() => setCurrentIndex((index) => Math.min(totalQuestions - 1, index + 1))}
            disabled={!hasAnswer}
            aria-label="Pertanyaan berikutnya"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  )
}
