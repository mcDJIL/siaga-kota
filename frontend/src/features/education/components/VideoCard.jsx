import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export function VideoCard({ video }) {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-64 shrink-0 flex-col gap-1 sm:w-auto sm:shrink"
      aria-label={`Tonton ${video.title} di YouTube`}
    >
      <div className="relative aspect-[79/41] w-full overflow-hidden rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]">
        <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-navy/20">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]">
            <Play className="ml-0.5 h-5 w-5 fill-navy text-navy" aria-hidden="true" />
          </span>
        </div>
        <span className="absolute right-2 bottom-2 rounded bg-black/60 px-1 py-0.5 text-xs font-semibold tracking-[0.6px] text-white">
          {video.duration}
        </span>
      </div>
      <h4 className="pt-3 text-base leading-6 font-semibold text-text-body">{video.title}</h4>
      <p className="text-base leading-6 text-text-muted">Kanal: {video.channel}</p>
    </motion.a>
  )
}
