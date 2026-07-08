const LOGO_SRC = 'https://api.builder.io/api/v1/image/assets/TEMP/743cb6703a54a91ad0f93d1241b9dd74364f330f?width=640'

export function AuthCard({ title, subtitle, children }) {
  return (
    <div className="flex w-full max-w-[448px] flex-col items-start gap-6 rounded-lg bg-white px-8 py-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] sm:px-10 sm:py-6">
      <div className="flex w-full flex-col items-center gap-1">
        <h1 className="pt-3 text-center font-heading text-2xl font-semibold text-navy">{title}</h1>
        <p className="text-center text-base text-text-muted">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
