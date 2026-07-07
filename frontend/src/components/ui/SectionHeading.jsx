import { cn } from '../../lib/cn'

export function SectionHeading({ title, description, align = 'center', className, descriptionClassName }) {
  const isCenter = align === 'center'

  return (
    <div className={cn('flex flex-col gap-3', isCenter ? 'items-center text-center' : 'items-start text-left', className)}>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h2>
      {description && (
        <p className={cn('max-w-2xl text-base leading-6 text-text-muted', descriptionClassName)}>{description}</p>
      )}
    </div>
  )
}
