import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projectsData, kinds, projectIndex } from '../data/projects'
import { SectionLink } from '../components/Hud'
import { IconArrow, IconArrowLeft, IconArrowUpRight, IconLock } from '../components/Icons'
import { statusOf } from '../sections/ProjectIndex'
import { useRevealAll, withViewTransition } from '../hooks/motion'
import Footer from '../sections/Footer'

const real = (url) => url && url !== '#'

/* Evita repetir o nome: "AI Voice Receptionist • Automação…" → "Automação…" */
const subtitleOf = (p) => {
  const t = p.title.trim()
  if (!t.toLowerCase().startsWith(p.name.toLowerCase())) return t
  return t.slice(p.name.length).replace(/^[\s•·—–-]+/, '').trim()
}

export default function ProjectDetail({ project }) {
  const navigate = useNavigate()
  const idx = projectIndex(project)
  const next = projectsData[(idx + 1) % projectsData.length]
  const st = statusOf(project)
  useRevealAll([project.id])

  useEffect(() => {
    const prev = document.title
    document.title = `${project.name} — Octávio Augusto`
    return () => {
      document.title = prev
    }
  }, [project])

  const goNext = (e) => {
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    withViewTransition(() => navigate(`/project-${next.id}`))
  }

  const [lead, ...rest] = project.overview

  return (
    <main id="conteudo" className="detail">
      <header className="detail__hero">
        <SectionLink id="projetos" className="detail__back mono">
          <IconArrowLeft size={14} /> Índice de trabalhos
        </SectionLink>

        <p className="eyebrow">
          Projeto {String(idx + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')} · {kinds[project.kind]}
        </p>
        <h1 className="detail__title" style={{ viewTransitionName: `project-title-${project.id}` }}>
          {project.name}
        </h1>
        {subtitleOf(project) && <p className="detail__subtitle">{subtitleOf(project)}</p>}
        <p className="detail__lede">{project.heroDesc}</p>

        <dl className="detail__meta">
          {project.client && (
            <div>
              <dt className="mono">Cliente</dt>
              <dd>{project.client}</dd>
            </div>
          )}
          <div>
            <dt className="mono">Status</dt>
            <dd>
              <span className={`status status--${st.key}`}>{st.label}</span>
            </dd>
          </div>
          <div>
            <dt className="mono">Categoria</dt>
            <dd>{kinds[project.kind]}</dd>
          </div>
          <div>
            <dt className="mono">Código</dt>
            <dd>{real(project.codeLink) ? 'Aberto no GitHub' : project.isPrivate ? 'Privado (NDA)' : '—'}</dd>
          </div>
        </dl>

        {(real(project.liveLink) || real(project.codeLink)) && (
          <div className="detail__actions">
            {real(project.liveLink) && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn btn--solid">
                Acessar aplicação <IconArrowUpRight />
              </a>
            )}
            {real(project.codeLink) && (
              <a href={project.codeLink} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Ver código-fonte <IconArrowUpRight />
              </a>
            )}
          </div>
        )}
      </header>

      <figure className="detail__cover brackets">
        <img src={project.cover} alt={`Imagem do projeto ${project.name}`} style={{ viewTransitionName: 'project-cover' }} />
      </figure>

      <div className="detail__body">
        <section className="detail__block" data-reveal aria-labelledby="ov">
          <h2 id="ov" className="detail__label mono">Visão geral</h2>
          <div className="detail__prose">
            <p className="detail__prose-lead">{lead}</p>
            {rest.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </section>

        {project.challenges?.length > 0 && (
          <section className="detail__block" aria-labelledby="ch">
            <h2 id="ch" className="detail__label mono" data-reveal>Desafios & soluções</h2>
            <ol className="challenges">
              {project.challenges.map((c, i) => (
                <li key={c.title} data-reveal>
                  <span className="mono challenges__n">0{i + 1}</span>
                  <h3>{c.title}</h3>
                  <p>{c.solution}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {project.results?.length > 0 && (
          <section className="detail__block" aria-labelledby="rs">
            <h2 id="rs" className="detail__label mono" data-reveal>Resultados</h2>
            <ul className="v-result v-result--page" style={{ '--lp': 1 }}>
              {project.results.map((r, k) => (
                <li key={r.metric} style={{ '--k': k }} data-reveal>
                  <span className="v-result__value">{r.value}</span>
                  <span className="v-result__metric">{r.metric}</span>
                  <span className="v-result__desc">{r.desc}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="detail__block" data-reveal aria-labelledby="tl">
          <h2 id="tl" className="detail__label mono">Ferramentas</h2>
          <ul className="tools">
            {project.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        {project.privateNote && (
          <aside className="note" data-reveal>
            <IconLock size={16} />
            <p>{project.privateNote}</p>
          </aside>
        )}
      </div>

      <Link to={`/project-${next.id}`} onClick={goNext} className="next">
        <span className="mono next__label">Próximo projeto · {String(projectIndex(next) + 1).padStart(2, '0')}</span>
        <span className="next__name" style={{ viewTransitionName: `project-title-${next.id}` }}>
          {next.name}
        </span>
        <IconArrow className="next__icon" size={40} strokeWidth={1.5} />
      </Link>

      <Footer />
    </main>
  )
}
