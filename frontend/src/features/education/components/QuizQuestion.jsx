import { motion, AnimatePresence } from 'framer-motion'
import { QuizOption } from './QuizOption'

export function QuizQuestion({ question, selectedIndex, onSelect }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-6"
      >
        <h2 className="font-heading text-xl font-semibold text-text-body sm:text-2xl">{question.question}</h2>
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <QuizOption
              key={option}
              label={option}
              selected={selectedIndex === index}
              onSelect={() => onSelect(index)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
