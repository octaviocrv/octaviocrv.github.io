import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projectsData } from '../data/projects'
import { useMediaQuery, useReducedMotion, useScrollProgress, withViewTransition } from '../hooks/motion'
import { IconArrow } from '../components/Icons'

const project = projectsData.find((p) => p.id === 1)

const STEPS = [
  {
    key: 'problema',
    tag: 'O problema',
    title: 'Filas no caixa custam vendas.',
    text: 'A Livraria Leitura enfrentava filas longas que prejudicavam a experiência do cliente e reduziam as vendas. O desafio: um self-checkout intuitivo, seguro e implantável em várias lojas.',
  },
  {
    key: 'arquitetura',
    tag: 'A arquitetura',
    title: 'Três serviços, um só fluxo.',
    text: 'Docker Compose orquestra o client React, a NIC (camada de integração) e o Nginx como gateway reverso. Por trás: APIs fiscais NFC-e e NFS-e, MySQL e AWS S3.',
  },
  {
    key: 'interface',
    tag: 'A interface',
    title: 'Um kiosk que não deixa sair do fluxo.',
    text: 'Cinco camadas contra manipulação: teclado desabilitado, menu de contexto bloqueado, drag & drop desativado, long-press monitorado e seleção de texto impedida. O branding muda em runtime, sem rebuild.',
  },
  {
    key: 'resultado',
    tag: 'O resultado',
    title: '60–70% menos tempo no checkout.',
    text: 'Em produção na Livraria Leitura, com 3 a 4 clientes atendidos simultaneamente por terminal e pronto para escalar para toda a rede.',
  },
]

const BLOCKED = ['keydown', 'contextmenu', 'dragstart', 'selectstart', 'long-press']

function QueueVisual() {
  return (
    <div className="v-queue">
      <div className="v-queue__counter">
        <span className="mono">CAIXA 01</span>
        <span className="v-queue__screen" />
      </div>
      <ol className="v-queue__line" aria-hidden="true">
        {Array.from({ length: 16 }, (_, k) => (
          <li key={k} style={{ '--k': k }} />
        ))}
      </ol>
      <div className="v-queue__meter">
        <span className="mono">Tempo de espera</span>
        <span className="v-queue__bar"><span /></span>
      </div>
    </div>
  )
}

function ArchVisual() {
  // caixas em coordenadas do viewBox 600x380
  const box = (x, y, w, label, sub, k) => (
    <g className="v-arch__box" style={{ '--k': k }}>
      <rect x={x} y={y} width={w} height="54" rx="6" />
      <text x={x + 14} y={y + 23} className="v-arch__label">{label}</text>
      <text x={x + 14} y={y + 41} className="v-arch__sub">{sub}</text>
    </g>
  )
  const wire = (d, k) => <path className="v-arch__wire" d={d} pathLength="1" style={{ '--k': k }} />
  return (
    <svg className="v-arch" viewBox="0 0 600 380" role="img" aria-label="Diagrama: kiosk React, Nginx e NIC em Docker Compose, conectados a MySQL, AWS S3 e APIs fiscais">
      <rect className="v-arch__frame" x="10" y="20" width="370" height="250" rx="10" />
      <text x="26" y="44" className="v-arch__frame-label">docker-compose.yml</text>
      {wire('M140 95 H200 V95 H230', 0.6)}
      {wire('M150 122 V190 H170', 1.0)}
      {wire('M300 122 V160 H250 V190', 1.2)}
      {wire('M340 217 H420 V80 H450', 1.6)}
      {wire('M340 217 H450', 1.8)}
      {wire('M340 217 H420 V320 H450', 2.0)}
      {box(30, 68, 120, 'Kiosk', 'client · React', 0)}
      {box(230, 68, 120, 'Nginx', 'gateway reverso', 0.4)}
      {box(170, 190, 170, 'NIC', 'camada de integração', 0.9)}
      {box(450, 53, 130, 'MySQL', 'persistência', 1.5)}
      {box(450, 190, 130, 'AWS S3', 'armazenamento', 1.7)}
      {box(450, 293, 130, 'NFC-e · NFS-e', 'APIs fiscais', 1.9)}
    </svg>
  )
}

function KioskVisual() {
  return (
    <div className="v-kiosk">
      <div className="v-kiosk__device">
        <img src={project.thumb} alt="Tela inicial do Self-Payment Terminal" loading="lazy" />
        <span className="v-kiosk__scan" aria-hidden="true" />
      </div>
      <ul className="v-kiosk__events" aria-label="Eventos bloqueados no kiosk">
        {BLOCKED.map((ev, k) => (
          <li key={ev} style={{ '--k': k }}>
            <span className="mono">{ev}</span>
            <span className="v-kiosk__x" aria-hidden="true">blocked</span>
          </li>
        ))}
      </ul>
      <code className="v-kiosk__code">
        e.preventDefault()<br />e.stopImmediatePropagation()
      </code>
    </div>
  )
}

function ResultVisual() {
  return (
    <ul className="v-result">
      {project.results.map((r, k) => (
        <li key={r.metric} style={{ '--k': k }}>
          <span className="v-result__value">{r.value}</span>
          <span className="v-result__metric">{r.metric}</span>
          <span className="v-result__desc">{r.desc}</span>
        </li>
      ))}
    </ul>
  )
}

const VISUALS = [QueueVisual, ArchVisual, KioskVisual, ResultVisual]

export default function CaseStory() {
  const ref = useRef(null)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()
  const wide = useMediaQuery('(min-width: 960px)')
  const pinned = wide && !reduced
  const navigate = useNavigate()

  useScrollProgress(ref, { steps: STEPS.length, onStep: setStep, enabled: pinned })

  const goTo = (i) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const total = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + total * ((i + 0.55) / STEPS.length), behavior: 'smooth' })
  }

  const openCase = (e) => {
    e.preventDefault()
    withViewTransition(() => navigate(`/project-${project.id}`))
  }

  const caseLink = (
    <Link to={`/project-${project.id}`} onClick={openCase} className="btn btn--ghost case__more">
      Ler o case completo <IconArrow />
    </Link>
  )

  if (!pinned) {
    return (
      <section id="case" data-section="case" className="case case--flow" aria-labelledby="case-title">
        <header className="case__head" data-reveal>
          <p className="eyebrow">01 — Case em destaque · {project.client}</p>
          <h2 id="case-title" className="h2">{project.name}</h2>
        </header>
        <ol className="case__flow">
          {STEPS.map((s, i) => {
            const Visual = VISUALS[i]
            return (
              <li key={s.key} className="case__flow-step" data-reveal>
                <p className="mono case__tag">0{i + 1} · {s.tag}</p>
                <h3 className="h3">{s.title}</h3>
                <p className="case__text">{s.text}</p>
                <div className="stage stage--static">
                  <div className="stage__layer is-active" style={{ '--lp': 1 }}><Visual /></div>
                </div>
              </li>
            )
          })}
        </ol>
        {caseLink}
      </section>
    )
  }

  return (
    <section
      id="case"
      data-section="case"
      ref={ref}
      className="case case--pinned"
      style={{ '--steps': STEPS.length }}
      aria-labelledby="case-title"
    >
      <div className="case__sticky">
        <div className="case__copy">
          <p className="eyebrow">01 — Case em destaque · {project.client}</p>
          <h2 id="case-title" className="case__name">{project.name}</h2>

          <div className="case__steps" aria-live="polite">
            {STEPS.map((s, i) => (
              <div key={s.key} className={`case__step${i === step ? ' is-active' : ''}`} aria-hidden={i !== step}>
                <p className="mono case__tag">0{i + 1} · {s.tag}</p>
                <h3 className="case__title">{s.title}</h3>
                <p className="case__text">{s.text}</p>
              </div>
            ))}
          </div>

          <ol className="case__rail" aria-label="Etapas do case">
            {STEPS.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  className={`case__rail-btn${i === step ? ' is-active' : ''}${i < step ? ' is-past' : ''}`}
                  onClick={() => goTo(i)}
                  aria-current={i === step ? 'step' : undefined}
                >
                  <span className="mono">0{i + 1}</span> {s.tag.replace(/^O |^A /, '')}
                </button>
              </li>
            ))}
          </ol>

          {caseLink}
        </div>

        <div className="stage" aria-hidden="false">
          <div className="stage__chrome mono" aria-hidden="true">
            <span>{STEPS[step].tag}</span>
            <span>self-payment · {String(step + 1).padStart(2, '0')}/04</span>
          </div>
          {VISUALS.map((Visual, i) => (
            <div
              key={STEPS[i].key}
              className={`stage__layer${i === step ? ' is-active' : ''}${i < step ? ' is-past' : ''}`}
              aria-hidden={i !== step}
            >
              <Visual />
            </div>
          ))}
          <span className="stage__corner stage__corner--tl" aria-hidden="true" />
          <span className="stage__corner stage__corner--br" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
