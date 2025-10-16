'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExperimentCard {
  id: string
  title: string
  description: string
  videoId?: string
  githubRepo?: string
  phase: 'phase-1' | 'phase-2' | 'phase-3'
  views?: string
  stars?: string
  status: 'published' | 'coming-soon'
  thumbnail?: string
}

const experiments: ExperimentCard[] = [
  {
    id: '1',
    title: 'AI Test Case Generator',
    description: 'Automatically generate comprehensive test cases from user stories and requirements using GPT-4.',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: '2',
    title: 'Smart Test Data Factory',
    description: 'AI-powered test data generation that creates realistic, compliant test datasets on demand.',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: '3',
    title: 'Visual Regression AI',
    description: 'Intelligent screenshot comparison that understands intentional vs. unintentional changes.',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: '4',
    title: 'Meeting Notes to Tasks',
    description: 'Transform meeting transcripts into actionable tasks and follow-ups automatically.',
    phase: 'phase-2',
    status: 'coming-soon'
  },
  {
    id: '5',
    title: 'Document Intelligence Hub',
    description: 'Extract, summarize, and organize insights from multiple document formats using AI.',
    phase: 'phase-2',
    status: 'coming-soon'
  },
  {
    id: '6',
    title: 'AI Email Orchestrator',
    description: 'Smart email categorization, prioritization, and draft responses for better inbox management.',
    phase: 'phase-2',
    status: 'coming-soon'
  },
  {
    id: '7',
    title: 'Code Review Assistant',
    description: 'AI-powered code review that suggests improvements, catches bugs, and ensures best practices.',
    phase: 'phase-3',
    status: 'coming-soon'
  },
  {
    id: '8',
    title: 'AI Sprint Planner',
    description: 'Intelligent sprint planning that optimizes team capacity and predicts delivery timelines.',
    phase: 'phase-3',
    status: 'coming-soon'
  },
  {
    id: '9',
    title: 'Knowledge Base Builder',
    description: 'Automatically generate and maintain technical documentation from code and conversations.',
    phase: 'phase-3',
    status: 'coming-soon'
  }
]

const phaseConfig = {
  'phase-1': {
    label: 'Phase 1',
    title: 'Applied AI for Testers',
    color: 'bg-primary-500',
    textColor: 'text-primary-600'
  },
  'phase-2': {
    label: 'Phase 2', 
    title: 'Applied AI in Workflows',
    color: 'bg-secondary-500',
    textColor: 'text-secondary-600'
  },
  'phase-3': {
    label: 'Phase 3',
    title: 'Applied AI Lab', 
    color: 'bg-accent-500',
    textColor: 'text-accent-600'
  }
}

interface ExperimentShowcaseProps {
  className?: string
}

export default function ExperimentShowcase({ className = '' }: ExperimentShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'phase-1' | 'phase-2' | 'phase-3'>('all')
  const [filteredExperiments, setFilteredExperiments] = useState(experiments)

  useEffect(() => {
    if (filter === 'all') {
      setFilteredExperiments(experiments)
    } else {
      setFilteredExperiments(experiments.filter(exp => exp.phase === filter))
    }
  }, [filter])

  const handleVideoClick = (videoId?: string) => {
    if (videoId) {
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
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Upcoming Experiments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore what we're building next — practical AI experiments launching soon
          </p>
        </motion.div>

        {/* Phase Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-4 p-2 bg-white rounded-2xl shadow-lg">
            {(['all', 'phase-1', 'phase-2', 'phase-3'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                {filterOption === 'all' ? 'All Experiments' : phaseConfig[filterOption].title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredExperiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
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
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer transform-gpu"
                onClick={() => handleVideoClick(experiment.videoId)}
              >
                {/* Video/Thumbnail Section */}
                <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                  {experiment.status === 'published' ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary-600 group-hover:text-white transition-all duration-300"
                        >
                          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </motion.div>
                      </div>
                      {experiment.thumbnail && (
                        <img 
                          src={experiment.thumbnail} 
                          alt={experiment.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-500 font-medium">Coming Soon</span>
                      </div>
                    </div>
                  )}

                  {/* Phase Badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${phaseConfig[experiment.phase].color}`}>
                      {phaseConfig[experiment.phase].label}
                    </span>
                  </div>

                  {/* Stats */}
                  {experiment.views && (
                    <div className="absolute top-4 right-4 z-30">
                      <span className="px-2 py-1 text-xs font-medium text-white bg-black/50 rounded">
                        {experiment.views} views
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {experiment.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {experiment.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {experiment.stars && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          {experiment.stars}
                        </span>
                      )}
                    </div>

                    {experiment.githubRepo && (
                      <a
                        href={`https://github.com/analysta-ai/${experiment.githubRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}