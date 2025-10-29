'use client'

import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function EpicToTestSuitePage() {
  const [theme, setTheme] = useState<'crystal' | 'obsidian'>('crystal')
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'tools'>('overview')

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('analysta-theme') as 'crystal' | 'obsidian'
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme('obsidian')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (theme === 'obsidian') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('analysta-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'crystal' ? 'obsidian' : 'crystal')
  }

  const benefits = [
    "Eliminates manual story and test documentation",
    "Ensures consistent Epic → Story → Test traceability",
    "Enables continuous AI-driven documentation and validation",
    "Integrates seamlessly with existing Agile/SAFe workflows"
  ]

  if (!mounted) {
    return null // Prevent flash of unstyled content
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 transition-colors duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl border-b border-white/60 dark:border-obsidian-300/60 shadow-sm"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-primary-700 dark:text-blue-300 hover:text-primary-600 dark:hover:text-blue-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-200 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200/50 dark:border-blue-500/30">
              <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full animate-pulse"></span>
              Case Study
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left - Text Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-lg dark:shadow-blue-500/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Epic → Test Suite Generator
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
                >
                  Automated requirements-to-test traceability with AI-powered orchestration
                </motion.p>
              </div>

              {/* Right - Video */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 p-4 md:p-6"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center border border-blue-200/50 dark:border-blue-700/50">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 font-medium">Demo Video Coming Soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content Grid - Tabs + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Tabs (3/4 width) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Tab Navigation */}
              <LayoutGroup>
                <div
                  className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-xl border border-white/60 dark:border-obsidian-300/60 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] w-full transition-colors duration-300"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {[
                    { id: 'overview' as const, label: 'Overview' },
                    { id: 'workflow' as const, label: 'Workflow' },
                    { id: 'tools' as const, label: 'Tools' }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative group inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold leading-tight transition-all duration-300 flex-1"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-tab-pill"
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
                          {tab.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                        The <strong className="text-blue-600 dark:text-blue-400">Epic → Test Suite Generator</strong> automates the journey from <strong>Epic definition</strong> to a <strong>fully traceable test suite</strong> within your Agile delivery workflow.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-base md:text-lg">
                        Triggered directly from <a href="https://support.atlassian.com/cloud-automation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Jira Automation</a>, the system orchestrates a series of <strong>agentic AI processes</strong> that analyze, decompose, and document requirements across connected tools.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-base md:text-lg">
                        Each Epic becomes the nucleus for a chain of automated knowledge transfer—from business specification to actionable QA validation—minimizing manual intervention while maintaining alignment with Agile / SAFe standards.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'workflow' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Workflow Summary</h2>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Trigger from Jira",
                          scope: null,
                          points: [
                            "Epic is created or updated.",
                            "A Jira Automation rule invokes the Epic → Test Suite Generator agent.",
                            "Relevant context (Epic details, comments, linked stories) is passed to the AI orchestration layer."
                          ]
                        },
                        {
                          title: "Epic Requirements Analysis → Specification",
                          scope: "in",
                          points: [
                            "AI reviews the Epic's requirements and generates a formal Epic Specification in Confluence.",
                            "Specification includes business goals, scope, acceptance criteria, and dependencies."
                          ]
                        },
                        {
                          title: "Epic → User Story Breakdown",
                          scope: "in",
                          points: [
                            "The agent decomposes the Epic into User Stories aligned with INVEST principles.",
                            "Drafts are created in Jira for review by the Product Owner or BA."
                          ]
                        },
                        {
                          title: "User Story Specification in Confluence",
                          scope: "in",
                          points: [
                            "Each accepted story automatically syncs to a linked Confluence User Story Spec page.",
                            "Non-functional and business acceptance criteria are appended for QA traceability."
                          ]
                        },
                        {
                          title: "User Story → Technical Tasks Breakdown",
                          scope: "out",
                          points: [
                            "Developer task creation and implementation remain manual or managed via standard Jira workflows."
                          ]
                        },
                        {
                          title: "User Story Level Test Cases in Zephyr",
                          scope: "in",
                          points: [
                            "AI extracts acceptance criteria and generates test cases in Zephyr Scale, linking them back to Jira stories."
                          ]
                        },
                        {
                          title: "Epic-Level E2E Test Suites in Zephyr",
                          scope: "in",
                          points: [
                            "Consolidates related stories into End-to-End Test Suites, maintaining Epic-to-test coverage."
                          ]
                        },
                        {
                          title: "Feedback and Re-analysis",
                          scope: null,
                          points: [
                            "User comments or updates in Jira or Confluence trigger AI Assistants via Jira Automation or Confluence Automation, initiating contextual updates or re-generation of specifications and tests."
                          ]
                        }
                      ].map((step, index) => (
                        <div key={index} className="border-l-4 border-blue-500 dark:border-blue-400 pl-4">
                          <div className="flex items-start gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                              {index + 1}. {step.title}
                            </h3>
                            {step.scope === "in" && (
                              <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-300 dark:border-blue-500/40 whitespace-nowrap">
                                In Scope
                              </span>
                            )}
                            {step.scope === "out" && (
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-500/40 whitespace-nowrap">
                                Out of Scope
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {step.points.map((point, pIndex) => (
                              <li key={pIndex} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex gap-2">
                                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                                <span className="flex-1">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'tools' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Tools and Integrations</h2>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: "Jira Automation", description: "Triggers and workflow orchestration", url: "https://support.atlassian.com/cloud-automation/" },
                        { name: "Confluence Automation", description: "Spec creation and update triggers", url: "https://support.atlassian.com/confluence-cloud/docs/what-are-automation-rules/" },
                        { name: "Zephyr Scale", description: "Automated test suite generation and traceability", url: "https://marketplace.atlassian.com/apps/1213259/zephyr-scale-test-management-for-jira" },
                        { name: "OpenAI Agentic System", description: "Handles document generation, semantic linking, and cross-tool orchestration", url: null },
                        { name: "Jira REST API / Webhooks", description: "Data exchange and synchronization", url: null }
                      ].map((tool, index) => (
                        <div key={index} className="bg-white/40 dark:bg-obsidian-100/40 rounded-xl p-4 border border-white/40 dark:border-obsidian-300/40 hover:bg-white/60 dark:hover:bg-obsidian-100/60 transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              {tool.url ? (
                                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                  {tool.name} ↗
                                </a>
                              ) : (
                                <span className="font-semibold text-gray-900 dark:text-white">{tool.name}</span>
                              )}
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Benefits Sidebar (1/4 width) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-[24px] shadow-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
                  
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-white text-sm leading-relaxed">{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5a87' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Footer />
    </main>
  )
}
