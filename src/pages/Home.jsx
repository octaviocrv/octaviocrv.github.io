import { useCallback, useState } from 'react'
import Hero from '../sections/Hero'
import CaseStory from '../sections/CaseStory'
import ProjectIndex from '../sections/ProjectIndex'
import Stack from '../sections/Stack'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import { useRevealAll } from '../hooks/motion'

export default function Home() {
  // filtro compartilhado: o grafo do hero e a seção Stack alimentam o índice de projetos
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
      <Hero onPickTech={pickTech} />
      <CaseStory />
      <ProjectIndex filter={filter} setFilter={setFilter} />
      <Stack activeTech={filter.type === 'tech' ? filter.value : null} onPick={pickTech} />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
