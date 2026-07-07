import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cn } from '../../../lib/cn'

export function QuizCard({ quiz }) {
  const isFeatured = quiz.variant === 'featured'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex flex-1 flex-col justify-between gap-8 rounded-2xl p-8 sm:p-10',
        isFeatured
          ? 'border border-brand-green-lighter/20 bg-brand-green'
          : 'border border-white/10 bg-[#D3E4FE]/10 backdrop-blur-md'
      )}
    >
      <div className="flex flex-col gap-2">
        <span
          className={cn(
            'w-fit rounded px-2 py-[3.5px] text-xs font-bold tracking-[1.2px] uppercase',
            isFeatured ? 'bg-brand-green-lighter text-[#002110]' : 'bg-bg-blue-lighter text-[#001B3C]'
          )}
        >
          +{quiz.points} Poin
        </span>
        <h3
          className={cn(
            'pt-2 font-heading font-semibold text-white',
            isFeatured ? 'text-2xl sm:text-[32px]' : 'text-base'
          )}
        >
          {quiz.title}
        </h3>
        <p className={cn('text-base leading-6 text-white', isFeatured ? 'opacity-90' : 'opacity-80')}>
          {quiz.description}
        </p>
      </div>

      {isFeatured ? (
        <Link
          to={`/education/quiz/${quiz.id}`}
          className="inline-flex w-fit items-center gap-4 rounded-xl bg-white px-10 py-4 text-base font-bold text-brand-green"
          aria-label={`Mulai kuis ${quiz.title}`}
        >
          Mulai Kuis
          <Play className="h-3.5 w-3 fill-brand-green text-brand-green" aria-hidden="true" />
        </Link>
      ) : (
        <Link
          to={`/education/quiz/${quiz.id}`}
          className="inline-flex w-fit items-center justify-center rounded-xl border-2 border-white px-10 py-4 text-center text-base font-bold text-white sm:px-[118px]"
          aria-label={`Ikut kuis ${quiz.title}`}
        >
          Ikut Kuis
        </Link>
      )}
    </motion.div>
  )
}
