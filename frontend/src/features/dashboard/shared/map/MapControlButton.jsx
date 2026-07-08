import { cn } from '../../../../lib/cn'

export function MapControlButton({ icon: Icon, label, onClick, disabled, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'flex items-center gap-1 text-sm font-bold tracking-[0.14px] transition-opacity disabled:opacity-50',
        className
      )}
    >
      <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
      {label}
    </button>
  )
}
