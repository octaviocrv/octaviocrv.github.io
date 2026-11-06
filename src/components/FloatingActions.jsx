import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { links } from '../data/profile'
import { IconArrowUp, IconWhatsApp } from './Icons'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const update = () => {
      const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY
      setShowTop(window.scrollY > 300 && remaining < window.innerHeight * 1.5)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [pathname])

  return (
    <div className="floating-actions">
      {showTop && (
        <button type="button" className="floating-actions__top" aria-label="Voltar ao topo" title="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>
          <IconArrowUp size={22} />
        </button>
      )}
      <a className="floating-actions__whatsapp" href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp">
        <IconWhatsApp size={28} />
      </a>
    </div>
  )
}
