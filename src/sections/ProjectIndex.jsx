import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projectsData, kinds } from '../data/projects'
import { projectUsesTech, techByName } from '../data/profile'
import { useMediaQuery, useReducedMotion, withViewTransition } from '../hooks/motion'
import { IconArrowUpRight, IconClose, IconLock } from '../components/Icons'

export function statusOf(p) {
  if (p.status === 'Em Produção') return { key: 'live', label: 'Em produção' }
  if (p.codeLink && p.codeLink !== '#') return { key: 'open', label: 'Código aberto' }
  if (p.liveLink && p.liveLink !== '#') return { key: 'online', label: 'Online' }
  return { key: 'private', label: 'Privado' }
}

function FloatingPreview({ project, visible }) {
  const ref = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })
  const reduced = useReducedMotion()

  useEffect(() => {
    const onMove = (e) => {
      // fica à direita do título: segue o cursor no Y, e no X nunca entra na coluna do nome
      target.current = { x: Math.max(e.clientX + 48, window.innerWidth * 0.47), y: e.clientY }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    let raf = 0
    const tick = () => {
      const k = reduced ? 1 : 0.16
      cur.current.x += (target.current.x - cur.current.x) * k
      cur.current.y += (target.current.y - cur.current.y) * k
      const vx = target.current.x - cur.current.x
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y - ref.current.offsetHeight / 2}px, 0) rotate(${Math.max(-6, Math.min(6, vx * 0.05))}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  return (
    <div ref={ref} className={`float-preview${visible ? ' is-visible' : ''}`} aria-hidden="true">
      <div className="float-preview__inner">
        {projectsData.map((p) => (
          <img key={p.id} src={p.thumb} alt="" className={p.id === project?.id ? 'is-current' : ''} loading="lazy" />
        ))}
      </div>
    </div>
  )
}

export default function ProjectIndex({ filter, setFilter }) {
  const [hovered, setHovered] = useState(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const navigate = useNavigate()

  const tech = filter.type === 'tech' ? techByName(filter.value) : null

  const matches = useMemo(() => {
    return projectsData.map((p) => {
      if (filter.type === 'kind') return p.kind === filter.value
      if (filter.type === 'tech' && tech) return projectUsesTech(p, tech)
      return true
    })
  }, [filter, tech])

  const count = matches.filter(Boolean).length

  const open = (e, p) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    withViewTransition(() => navigate(`/project-${p.id}`))
  }

  const chips = [{ type: 'all', value: null, label: 'Todos' }, ...Object.entries(kinds).map(([k, label]) => ({ type: 'kind', value: k, label }))]

  return (
    <section id="projetos" data-section="projetos" className="index" aria-labelledby="index-title">
      <header className="index__head">
        <div data-reveal>
          <p className="eyebrow">02 — Projetos</p>
          <h2 id="index-title" className="h2">
            Índice de <em>trabalhos.</em>
          </h2>
        </div>
        <p className="index__intro" data-reveal>
          Sistemas em produção, produtos sob NDA e projetos abertos. Cada linha leva ao problema,
          à solução e às ferramentas usadas.
        </p>
      </header>

      <div className="index__bar" role="toolbar" aria-label="Filtrar projetos">
        <div className="index__chips">
          {chips.map((c) => {
            const active = filter.type === c.type && filter.value === c.value
            return (
              <button
                key={c.label}
                type="button"
                className={`chip${active ? ' is-active' : ''}`}
                aria-pressed={active}
                onClick={() => setFilter({ type: c.type, value: c.value })}
              >
                {c.label}
              </button>
            )
          })}
          {tech && (
            <button
              type="button"
              className="chip chip--tech is-active"
              onClick={() => setFilter({ type: 'all', value: null })}
              aria-label={`Remover filtro ${tech.name}`}
            >
              usa {tech.name} <IconClose />
            </button>
          )}
        </div>
        <p className="mono index__count" aria-live="polite">
          {String(count).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')} projetos
        </p>
      </div>

      <ol className="index__list" onPointerLeave={() => setHovered(null)}>
        {projectsData.map((p, i) => {
          const st = statusOf(p)
          const on = matches[i]
          return (
            <li key={p.id} className={`row-wrap${on ? '' : ' is-out'}`} aria-hidden={!on}>
              <div className="row-clip">
                <Link
                  to={`/project-${p.id}`}
                  className="row"
                  tabIndex={on ? 0 : -1}
                  onClick={(e) => open(e, p)}
                  onPointerEnter={() => setHovered(p)}
                  onFocus={() => setHovered(p)}
                >
                  <span className="row__idx mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="row__thumb" aria-hidden="true">
                    <img src={p.thumb} alt="" loading="lazy" />
                  </span>
                  <span className="row__main">
                    <span className="row__name" style={{ viewTransitionName: `project-title-${p.id}` }}>{p.name}</span>
                    <span className="row__desc">{p.shortDesc}</span>
                  </span>
                  <span className="row__kind mono">{kinds[p.kind]}</span>
                  <span className={`row__status status status--${st.key}`}>
                    {st.key === 'private' && <IconLock />}
                    {st.label}
                  </span>
                  <span className="row__go" aria-hidden="true">
                    <IconArrowUpRight />
                  </span>
                </Link>
              </div>
            </li>
          )
        })}
      </ol>

      {finePointer && <FloatingPreview project={hovered} visible={Boolean(hovered)} />}
    </section>
  )
}
