'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ExperimentCardProps {
  title: string
  description: string
  videoId?: string
  githubRepo?: string
  badge?: {
    label: string
    color: string
  }
  views?: string
  stars?: string
  status?: 'published' | 'coming-soon'
  thumbnail?: string
  index?: number
  link?: string
  onClick?: () => void
}

export default function ExperimentCard({
  title,
  description,
  videoId,
  githubRepo,
  badge,
  views,
  stars,
  status = 'coming-soon',
  thumbnail,
  index = 0,
  link,
  onClick
}: ExperimentCardProps) {
  const router = useRouter()

  const handleVideoClick = () => {
    if (onClick) {
      onClick()
    } else if (link) {
      router.push(link)
    } else if (videoId) {
      // Create video modal
      const modal = document.createElement('div')
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center video-modal-overlay'
      modal.innerHTML = `
        <div class="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-xl overflow-hidden">
          <button class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10">&times;</button>
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            class="w-full h-full" 
            frameborder="0" 
            allowfullscreen
          ></iframe>
        </div>
      `
      
      document.body.appendChild(modal)
      
      // Close modal handlers
      const closeBtn = modal.querySelector('button')
      const closeModal = () => document.body.removeChild(modal)
      
      closeBtn?.addEventListener('click', closeModal)
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal()
      })
      
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeModal()
          document.removeEventListener('keydown', escHandler)
        }
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 overflow-hidden group cursor-pointer transform-gpu hover:shadow-[0_12px_40px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-300"
      onClick={handleVideoClick}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Video/Thumbnail Section */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-800/30 dark:to-secondary-800/30 backdrop-blur-sm overflow-hidden">
        {status === 'published' ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-white/95 dark:bg-obsidian-200/95 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] group-hover:bg-primary-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 border border-white/40 dark:border-obsidian-300/40"
              >
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </motion.div>
            </div>
            {thumbnail && (
              <img 
                src={thumbnail} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full py-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/70 dark:bg-obsidian-200/70 backdrop-blur-lg rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-semibold">Coming Soon</span>
            </div>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30">
            <span className={`px-3 sm:px-4 py-1.5 text-xs font-bold text-white rounded-full backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        )}

        {/* Stats */}
        {views && (
          <div className="absolute top-4 right-4 z-30">
            <span className="px-3 py-1.5 text-xs font-semibold text-white bg-black/40 dark:bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              {views} views
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 bg-white/30 dark:bg-obsidian-100/30 backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/40 dark:border-obsidian-300/40">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {stars && (
              <span className="flex items-center font-medium">
                <svg className="w-4 h-4 mr-1 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {stars}
              </span>
            )}
          </div>

          {githubRepo && (
            <a
              href={`https://github.com/analysta-ai/${githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm text-primary-700 dark:text-blue-400 hover:text-primary-800 dark:hover:text-blue-300 font-semibold bg-white/60 dark:bg-obsidian-200/60 hover:bg-white/80 dark:hover:bg-obsidian-200/80 backdrop-blur-sm rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
