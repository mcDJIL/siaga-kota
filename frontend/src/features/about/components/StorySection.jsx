import { motion } from 'framer-motion'
import { cn } from '../../../lib/cn'
import { STORY } from '../data/story'

export function StorySection() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
        >
          <img src={STORY.image} alt="Tim SiagaKota berdiskusi" className="h-auto w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-1 flex-col gap-6"
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{STORY.title}</h2>
          <div className="flex flex-col gap-4">
            {STORY.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-[1.625] text-text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {STORY.avatarColors.map((color, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index} className={cn('h-10 w-10 rounded-full border-2 border-white', color)} />
              ))}
            </div>
            <p className="text-xs font-semibold tracking-[0.6px] text-text-muted italic">{STORY.caption}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
