import HeroSection from '@/components/HeroSection'
import ExperimentShowcase from '@/components/ExperimentShowcase'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExperimentShowcase />
      <Footer />
    </main>
  )
}