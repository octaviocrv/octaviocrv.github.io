import { useCallback, useState } from 'react'
import Hero from '../sections/Hero'
import CaseStory from '../sections/CaseStory'
import ProjectIndex from '../sections/ProjectIndex'
import Stack from '../sections/Stack'
import About from '../sections/About'
import Journey from '../sections/Journey'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import { useRevealAll } from '../hooks/motion'

export default function Home() {
  // filtro compartilhado: a seção Stack alimenta o índice de projetos
  const [filter, setFilter] = useState({ type: 'all', value: null })
  useRevealAll()

  const pickTech = useCallback((tech) => {
    setFilter({ type: 'tech', value: tech })
    requestAnimationFrame(() => {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <main id="conteudo">
      <Hero />
      <CaseStory />
      <About />
      <Journey />
      <ProjectIndex filter={filter} setFilter={setFilter} />
      <Stack activeTech={filter.type === 'tech' ? filter.value : null} onPick={pickTech} />
      <Contact />
      <Footer />
    </main>
  )
}
