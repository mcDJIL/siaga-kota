import { Button } from '@/components/ui/Button'

export function ErrorActionButtons({ actions = [] }) {
  if (!actions || actions.length === 0) return null

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'primary'}
          onClick={action.onClick}
          aria-label={action.label}
          className={action.className}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
