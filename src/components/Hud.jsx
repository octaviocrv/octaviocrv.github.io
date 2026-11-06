import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { asset } from '../utils/asset'
import { links } from '../data/profile'
import { IconArrowUpRight, IconWhatsApp } from './Icons'

const NAV = [
  { id: 'case', label: 'Case' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'stack', label: 'Stack' },
]

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

/** Observa as seções [data-section] da página atual e devolve a ativa. */
function useActiveSection(pathname) {
  const [active, setActive] = useState(null)
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
        { rootMargin: '-45% 0px -50% 0px' }
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

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuBtn = useRef(null)
  const onDark = isHome && active === 'contato'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const cls = ['site-header', scrolled && 'is-scrolled', onDark && 'is-dark', menuOpen && 'is-menu']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <div className="site-header__inner container">
        <SectionLink id="inicio" className="brand" aria-label="Octávio Augusto, início">
          <img src={asset('/assets/img/header-avatar.svg')} alt="" className="brand__avatar" width="44" height="44" />
          <span className="brand__name">Octávio Augusto</span>
        </SectionLink>

        <nav className="site-nav" aria-label="Seções">
          <ul>
            {NAV.map((s) => (
              <li key={s.id}>
                <SectionLink
                  id={s.id}
                  className="site-nav__link"
                  aria-current={isHome && active === s.id ? 'true' : undefined}
                >
                  {s.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href={links.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary btn--small">
            <IconWhatsApp size={16} /> Conversar sobre oportunidades
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="menu-sheet"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="menu-sheet" className={`menu-sheet${menuOpen ? ' is-open' : ''}`} inert={menuOpen ? undefined : ''}>
        <nav aria-label="Menu" className="container">
          <ul className="menu-sheet__list">
            {[{ id: 'inicio', label: 'Início' }, ...NAV, { id: 'contato', label: 'Contato' }].map((s, i) => (
              <li key={s.id} style={{ '--i': i }}>
                <SectionLink id={s.id} className="menu-sheet__link" onNavigate={() => setMenuOpen(false)}>
                  {s.label}
                </SectionLink>
              </li>
            ))}
          </ul>
          <div className="menu-sheet__foot">
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <IconArrowUpRight size={14} />
            </a>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub <IconArrowUpRight size={14} />
            </a>
            <a href={links.instagram} target="_blank" rel="noreferrer">
              Instagram <IconArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
