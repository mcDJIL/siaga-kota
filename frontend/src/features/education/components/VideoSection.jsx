import { ChevronRight } from 'lucide-react'
import { VideoCard } from './VideoCard'
import { VIDEOS } from '../data/videos'

export function VideoSection() {
  return (
    <section className="px-4 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Video Tutorial
            </h2>
            <p className="text-base leading-6 text-text-muted">Panduan visual untuk aksi nyata di lapangan.</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-base text-navy">
            Lihat Semua Video
            <ChevronRight className="h-3 w-2" aria-hidden="true" />
          </a>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
