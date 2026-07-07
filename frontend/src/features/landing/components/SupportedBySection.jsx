const PARTNERS = ['PEMPROV JATIM', 'BPBD', 'BMKG', 'TECH-PARTNER']

export function SupportedBySection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8">
      <div className="flex flex-col gap-10">
        <h3 className="text-center font-sans text-sm font-medium tracking-[1.4px] text-text-muted uppercase">
          Didukung Oleh
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-60 sm:gap-10">
          {PARTNERS.map((partner) => (
            <div key={partner} className="rounded bg-bg-blue-lighter px-6 py-4">
              <span className="font-sans text-base font-bold text-navy">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
