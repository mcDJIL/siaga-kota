import { cn } from '../../../../lib/cn'

export function MapLayerControl({ layers, activeLayers, onToggle, className }) {
  return (
    <div
      className={cn(
        'absolute z-[400] flex w-[201px] flex-col gap-1 rounded-xl border border-border-muted bg-white p-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]',
        className
      )}
    >
      {layers.map((layer) => {
        const isActive = activeLayers.includes(layer.id)
        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => onToggle(layer.id)}
            aria-pressed={isActive}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-3 py-2 text-left',
              isActive ? cn(layer.activeBorder, layer.activeBg) : 'border-transparent bg-bg-blue-soft'
            )}
          >
            <layer.icon
              className={cn('h-3.5 w-3.5 shrink-0', isActive ? layer.activeText : 'text-text-muted')}
              aria-hidden="true"
            />
            <span className={cn('flex-1 text-xs font-bold', isActive ? layer.activeText : 'text-text-muted')}>
              {layer.label}
            </span>
            <span
              className={cn('h-2 w-2 shrink-0 rounded-full', isActive ? layer.dotActive : 'bg-badge-neutral')}
              aria-hidden="true"
            />
          </button>
        )
      })}
    </div>
  )
}
