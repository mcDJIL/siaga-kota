import { AuthIllustration } from '../features/auth/components/AuthIllustration'
import { AnimatedAuthSwitcher } from '../features/auth/components/AnimatedAuthSwitcher'
import { AuthFooter } from '../features/auth/components/AuthFooter'

export function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-blue-soft lg:flex-row">
      <AuthIllustration />
      <div className="flex flex-1 flex-col">
        <AnimatedAuthSwitcher>{children}</AnimatedAuthSwitcher>
        <AuthFooter />
      </div>
    </div>
  )
}
