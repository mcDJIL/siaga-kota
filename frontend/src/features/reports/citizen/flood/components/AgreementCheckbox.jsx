import { useFormContext } from 'react-hook-form'

export function AgreementCheckbox() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex max-w-md flex-col gap-1">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register('agreement')}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-muted text-navy focus:ring-navy"
        />
        <span className="text-xs font-semibold tracking-[0.6px] text-text-muted">
          Saya menyatakan bahwa data yang saya kirimkan adalah benar dan dapat dipertanggungjawabkan.
        </span>
      </label>
      {errors.agreement && <p className="text-sm text-[#BA1A1A]">{errors.agreement.message}</p>}
    </div>
  )
}
