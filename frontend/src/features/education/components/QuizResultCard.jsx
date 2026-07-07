import { Link } from 'react-router-dom'
import { CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

function Statistic({ icon: Icon, label, value, iconColor }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-bg-soft p-6 text-center">
      <Icon className={iconColor} aria-hidden="true" />
      <span className="font-heading text-2xl font-semibold text-text-body">{value}</span>
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  )
}

export function QuizResultCard({ quiz, correctCount, totalQuestions, earnedPoints }) {
  const percentage = Math.round((correctCount / totalQuestions) * 100)
  const wrongCount = totalQuestions - correctCount

  return (
    <div className="flex flex-col items-center gap-8 rounded-2xl bg-white p-8 text-center shadow-[0_4px_20px_0_rgba(26,54,93,0.08)] sm:p-10">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-light">
        <Trophy className="h-8 w-8 text-brand-green-dark" aria-hidden="true" />
      </span>

      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-navy">Kuis Selesai!</h1>
        <p className="text-base text-text-muted">Hasil kuis &ldquo;{quiz.title}&rdquo;</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        <Statistic icon={Trophy} label="Skor" value={`${percentage}%`} iconColor="text-brand-green-dark" />
        <Statistic icon={CheckCircle2} label="Benar" value={correctCount} iconColor="text-brand-green" />
        <Statistic icon={XCircle} label="Salah" value={wrongCount} iconColor="text-[#BA1A1A]" />
        <Statistic icon={Trophy} label="Poin Didapat" value={earnedPoints} iconColor="text-navy" />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button as={Link} to={`/education/quiz/${quiz.id}`} variant="navy" size="md">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Coba Lagi
        </Button>
        <Button as={Link} to="/education" variant="ghost" size="md">
          Kembali ke Edukasi
        </Button>
      </div>
    </div>
  )
}
