import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Hud from './components/Hud'
import { projectsData } from './data/projects'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // espera o conteúdo montar antes de rolar até a âncora
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const tick = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ block: 'start' })
        else if (tries++ < 20) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <ScrollManager />
      <Hud />
      <Routes>
        <Route path="/" element={<Home />} />
        {projectsData.map((project) => (
          <Route
            key={project.id}
            path={`/project-${project.id}`}
            element={<ProjectDetail project={project} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
