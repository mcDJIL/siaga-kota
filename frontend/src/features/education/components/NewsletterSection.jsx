import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'
import { newsletterSchema } from '../validation/newsletterSchema'
import { NEWSLETTER_INFO } from '../data/newsletter'

export function NewsletterSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(newsletterSchema), defaultValues: { email: '' } })

  const onSubmit = (data) => {
    console.log('Berlangganan buletin (belum ada backend):', data)
    reset()
  }

  return (
    <section className="px-4 pb-16 sm:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-8 overflow-hidden rounded-3xl bg-bg-blue-lighter p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-navy sm:text-[32px]">
            {NEWSLETTER_INFO.title}
          </h2>
          <p className="text-base leading-6 text-text-muted">{NEWSLETTER_INFO.description}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row"
        >
          <div className="flex w-full flex-col gap-1 sm:min-w-[300px]">
            <label htmlFor="newsletter-email" className="sr-only">
              Alamat email Anda
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Alamat email Anda"
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-xl bg-white px-6 py-[18px] text-base text-text-body shadow-[0_0_0_1px_#74777F] placeholder:text-[#6B7280] focus:outline-2 focus:outline-brand-green"
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-[#BA1A1A]">{errors.email.message}</p>}
            {isSubmitSuccessful && !errors.email && (
              <p className="text-sm text-brand-green">Terima kasih telah berlangganan!</p>
            )}
          </div>
          <Button type="submit" variant="navy" className="w-full rounded-xl px-10 py-[18px] sm:w-auto">
            Langganan
          </Button>
        </form>
      </motion.div>
    </section>
  )
}
