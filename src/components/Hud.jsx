import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { asset } from '../utils/asset'
import { links } from '../data/profile'

export const SECTIONS = [
  { id: 'inicio', label: 'Início', route: '/' },
  { id: 'case', label: 'Case', route: '/case' },
  { id: 'projetos', label: 'Projetos', route: '/projetos' },
  { id: 'stack', label: 'Stack', route: '/stack' },
  { id: 'sobre', label: 'Sobre', route: '/sobre' },
  { id: 'contato', label: 'Contato', route: '/contato' },
]

const NAV = SECTIONS.filter((s) => ['case', 'projetos', 'stack', 'sobre'].includes(s.id))

/** Link para uma seção da home que funciona a partir de qualquer página. */
export function SectionLink({ id, children, onNavigate, ...rest }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onClick = (e) => {
    onNavigate?.()
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    if (pathname === '/') {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `${import.meta.env.BASE_URL}${id === 'inicio' ? '' : `#${id}`}`)
      }
    } else {
      navigate(id === 'inicio' ? '/' : `/#${id}`)
    }
  }
  return (
    <a href={`${import.meta.env.BASE_URL}${id === 'inicio' ? '' : `#${id}`}`} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}

function useBhClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)
}

/** Observa as seções [data-section] da página atual e devolve a ativa. */
function useActiveSection(pathname) {
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    let io
    const raf = requestAnimationFrame(() => {
      const els = [...document.querySelectorAll('[data-section]')]
      if (!els.length) {
        setActive(null)
        return
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.dataset.section)
          })
        },
        { rootMargin: '-48% 0px -48% 0px' }
      )
      els.forEach((el) => io.observe(el))
    })
    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [pathname])
  return active
}

function RouteLog({ route }) {
  const [text, setText] = useState(route)
  useEffect(() => {
    if (!route) return undefined
    let i = 0
    setText('')
    const t = setInterval(() => {
      i += 1
      setText(route.slice(0, i))
      if (i >= route.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  }, [route])
  return (
    <span className="hud__log" aria-hidden="true">
      <span className="hud__log-verb">GET</span> {text}
      <span className="hud__log-ok">200</span>
    </span>
  )
}

export default function Hud() {
  const { pathname } = useLocation()
  const active = useActiveSection(pathname)
  const time = useBhClock()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [quiet, setQuiet] = useState(true)
  const lastY = useRef(0)
  const menuBtn = useRef(null)

  const isHome = pathname === '/'
  const activeIdx = SECTIONS.findIndex((s) => s.id === active)
  const current = SECTIONS[activeIdx]
  const route = isHome ? current?.route ?? '/' : pathname
  const light = isHome && active === 'sobre'

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? y / max : 0)
        setQuiet(y < window.innerHeight * 0.55)
        if (y < 160) setHidden(false)
        else if (y > lastY.current + 4) setHidden(true)
        else if (y < lastY.current - 4) setHidden(false)
        lastY.current = y
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.surface = light ? 'light' : 'dark'
  }, [light])

  useEffect(() => {
    if (!menuOpen) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      menuBtn.current?.focus()
    }
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <header className={`hud-top${hidden && !menuOpen ? ' is-hidden' : ''}${menuOpen ? ' is-menu' : ''}`}>
        <SectionLink id="inicio" className="brand" aria-label="Octávio Augusto — início">
          <img src={asset('/assets/img/avatar.webp')} alt="" className="brand__avatar" width="34" height="34" />
          <span className="brand__name">
            Octávio Augusto
            <span className="brand__role">Full Stack · BH</span>
          </span>
        </SectionLink>

        <nav className="hud-nav" aria-label="Seções">
          <ul>
            {NAV.map((s) => (
              <li key={s.id}>
                <SectionLink id={s.id} className={`hud-nav__link${isHome && active === s.id ? ' is-active' : ''}`}>
                  <span className="hud-nav__idx">{String(SECTIONS.indexOf(s)).padStart(2, '0')}</span>
                  {s.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <SectionLink id="contato" className="hud-cta">
          <span className="live-dot" aria-hidden="true" />
          Bora conversar
        </SectionLink>

        <button
          ref={menuBtn}
          type="button"
          className="hud-burger"
          aria-expanded={menuOpen}
          aria-controls="menu-overlay"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        id="menu-overlay"
        className={`menu${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : ''}
      >
        <nav aria-label="Menu">
          <ol className="menu__list">
            {SECTIONS.map((s, i) => (
              <li key={s.id} style={{ '--i': i }}>
                <SectionLink id={s.id} className="menu__link" onNavigate={() => setMenuOpen(false)}>
                  <span className="menu__idx">{String(i).padStart(2, '0')}</span>
                  {s.label}
                </SectionLink>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>

      {/* Barramento: trilha de circuito que acompanha o scroll e serve de navegação */}
      {isHome && (
        <nav className="bus" aria-label="Progresso da página" style={{ '--prog': progress }}>
          <span className="bus__rail" aria-hidden="true">
            <span className="bus__fill" />
            <span className="bus__packet" />
          </span>
          <ol>
            {SECTIONS.map((s, i) => (
              <li key={s.id} style={{ '--at': i / (SECTIONS.length - 1) }}>
                <SectionLink
                  id={s.id}
                  className={`bus__node${i <= activeIdx ? ' is-passed' : ''}${i === activeIdx ? ' is-active' : ''}`}
                  aria-current={i === activeIdx ? 'true' : undefined}
                >
                  <span className="bus__label">
                    {String(i).padStart(2, '0')} {s.label}
                  </span>
                </SectionLink>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <span className="topbar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div className={`hud-bottom${quiet && isHome ? ' is-quiet' : ''}`} aria-hidden="true">
        <span className="hud__geo">
          Belo Horizonte, MG · 19°55′S 43°56′O
          <span className="hud__time">
            <b>{time}</b> BRT
          </span>
        </span>
        <span className="hud__route">
          <RouteLog route={route} />
          {isHome && current && (
            <span className="hud__count">
              <b>{String(activeIdx).padStart(2, '0')}</b> / {String(SECTIONS.length - 1).padStart(2, '0')}
            </span>
          )}
        </span>
      </div>
    </>
  )
}
