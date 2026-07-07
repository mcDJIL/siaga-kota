import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

export function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = { title, url: window.location.href }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        /* user cancelled share */
      }
      return
    }

    await navigator.clipboard.writeText(shareData.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleShare} aria-label="Bagikan artikel ini">
      <Share2 className="h-4 w-4" aria-hidden="true" />
      {copied ? 'Tautan disalin' : 'Bagikan'}
    </Button>
  )
}
