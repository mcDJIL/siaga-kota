import { Select } from '../../../../components/ui/Select'

export function FilterSelect({ label, value, onChange, options, ariaLabel }) {
  return (
    <div className="flex h-[76px] items-center justify-between gap-3 rounded-xl bg-white px-4 shadow-[0_4px_6px_-1px_rgba(26,54,93,0.08)]">
      <span className="shrink-0 text-sm font-medium tracking-[0.14px] text-text-muted">{label}</span>
      <Select
        aria-label={ariaLabel ?? label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-auto min-w-[110px] rounded-lg bg-transparent py-2 pr-8 pl-3 text-right text-base text-navy"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
