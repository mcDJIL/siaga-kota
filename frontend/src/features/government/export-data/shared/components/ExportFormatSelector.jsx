import { FORMAT_OPTIONS } from '../../data/exportHistoryData'
import { FORMAT_ICONS } from '../../utils/formatColor'
import { cn } from '../../../../../lib/cn'

export function ExportFormatSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text-body">Format Laporan</span>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Format Laporan">
        {FORMAT_OPTIONS.map((option) => {
          const Icon = FORMAT_ICONS[option.value]
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-navy text-white' : 'border border-[#C4C6CF] bg-white text-text-body hover:bg-bg-blue-soft'
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
