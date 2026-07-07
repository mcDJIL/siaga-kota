import { Link, useLocation, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { QuizResultCard } from '../components/QuizResultCard'
import { getQuizById } from '../data/quizzes'

export function QuizResultPage() {
  const { id } = useParams()
  const location = useLocation()
  const quiz = getQuizById(id)
  const answers = location.state?.answers

  if (!quiz || !answers) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-navy">Hasil kuis tidak tersedia</h1>
        <p className="text-base text-text-muted">Selesaikan kuis terlebih dahulu untuk melihat hasilnya.</p>
        <Button as={Link} to="/education/quiz" variant="primary" size="sm">
          Lihat Semua Kuis
        </Button>
      </div>
    )
  }

  const correctCount = quiz.questions.reduce(
    (count, question, index) => (answers[index] === question.correctIndex ? count + 1 : count),
    0
  )
  const earnedPoints = Math.round((correctCount / quiz.questions.length) * quiz.points)

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-8 sm:py-16">
      <QuizResultCard
        quiz={quiz}
        correctCount={correctCount}
        totalQuestions={quiz.questions.length}
        earnedPoints={earnedPoints}
      />
    </div>
  )
}
