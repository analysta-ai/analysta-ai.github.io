'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import ExperimentCard from '@/components/ExperimentCard'

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
  link?: string
}

const experiments: ExperimentCard[] = [
  {
    id: 'epic-to-test-suite',
    title: 'Epic to Test Suite Generator',
    description: 'Transform epics into comprehensive test cases with AI-powered analysis and coverage mapping',
    phase: 'phase-1',
    status: 'coming-soon',
    link: '/experiments/epic-to-test-suite'
  },
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
  const filterOptions = ['all', 'phase-1', 'phase-2', 'phase-3'] as const

  useEffect(() => {
    if (filter === 'all') {
      setFilteredExperiments(experiments)
    } else {
      setFilteredExperiments(experiments.filter(exp => exp.phase === filter))
    }
  }, [filter])

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-obsidian-50 transition-colors duration-500 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Upcoming Experiments
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Explore what we're building next — practical AI experiments launching soon
          </p>
        </motion.div>

        {/* Phase Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 lg:mb-12 px-4"
        >
          <LayoutGroup>
            <div
              data-testid="experiment-filter-container"
              className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-xl border border-white/60 dark:border-obsidian-300/60 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] w-full sm:w-auto transition-colors duration-300"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              {filterOptions.map((filterOption) => {
                const isActive = filter === filterOption
                return (
                  <button
                    key={filterOption}
                    data-testid="experiment-filter-button"
                    onClick={() => setFilter(filterOption)}
                    className="relative group inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold leading-tight transition-all duration-300"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-filter-pill"
                        className="absolute inset-0 rounded-[24px] bg-white/95 dark:bg-obsidian-300/95 shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                    >
                      {filterOption === 'all' ? 'All Experiments' : phaseConfig[filterOption].title}
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredExperiments.map((experiment, index) => (
              <ExperimentCard
                key={experiment.id}
                title={experiment.title}
                description={experiment.description}
                videoId={experiment.videoId}
                githubRepo={experiment.githubRepo}
                badge={{
                  label: phaseConfig[experiment.phase].label,
                  color: phaseConfig[experiment.phase].color
                }}
                views={experiment.views}
                stars={experiment.stars}
                status={experiment.status}
                thumbnail={experiment.thumbnail}
                link={experiment.link}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}