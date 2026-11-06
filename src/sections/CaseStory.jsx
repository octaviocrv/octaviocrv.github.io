import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projectsData } from '../data/projects'
import { useMediaQuery, useReducedMotion, useScrollProgress, withViewTransition } from '../hooks/motion'
import { IconArrow } from '../components/Icons'
import { hl } from '../components/Hl'
import { asset } from '../utils/asset'

const project = projectsData.find((p) => p.id === 1)

const STEPS = [
  {
    key: 'problema',
    tag: 'O problema',
    title: 'Filas no caixa custavam vendas.',
    text: 'Filas longas no caixa afastavam clientes e reduziam as vendas da Livraria Leitura. Desenvolvi um terminal de autoatendimento seguro, pronto para várias lojas.',
  },
  {
    key: 'arquitetura',
    tag: 'A arquitetura',
    title: 'Três serviços, um só fluxo.',
    text: 'Organizei o sistema em Docker Compose: client React, NIC (camada de integração) e Nginx como gateway reverso, ligados às APIs fiscais NFC-e e NFS-e, MySQL e AWS S3.',
  },
  {
    key: 'interface',
    tag: 'A interface',
    title: 'Um kiosk que não deixa sair do fluxo.',
    text: 'Este terminal faz parte do ERP da Nérus, onde trabalho. Desenvolvi a interface em React, em colaboração com o time C, para o cliente comprar sem sair do fluxo.',
  },
  {
    key: 'resultado',
    tag: 'O resultado',
    title: '60–70% menos tempo no checkout.',
    text: 'Em uso hoje nas livrarias Leitura, com impressão, bloqueio e testes de segurança para totem. Pronto para o resto da rede.',
  },
]

function QueueVisual() {
  // valores relativos: o único número medido é a redução de 60–70% no tempo de checkout
  return (
    <figure className="v-queue">
      <div className="v-queue__row">
        <span className="v-queue__label">Caixa tradicional</span>
        <span className="v-queue__bar"><span style={{ '--w': 1 }} /></span>
      </div>
      <div className="v-queue__row is-new">
        <span className="v-queue__label">Self-checkout</span>
        <span className="v-queue__bar"><span style={{ '--w': 0.35 }} /></span>
      </div>
      <figcaption>
        Tempo de checkout, em escala relativa. Redução medida em produção: <mark className="hl">60–70%</mark>.
      </figcaption>
    </figure>
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
      {wire('M150 95 H230', 0.6)}
      {wire('M90 122 V217 H170', 1.0)}
      {wire('M290 122 V190', 1.2)}
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

const SERVICES = [
  ['Kiosk', 'client React'],
  ['Nginx', 'gateway reverso'],
  ['NIC', 'camada de integração'],
  ['MySQL', 'persistência'],
  ['AWS S3', 'armazenamento'],
  ['NFC-e · NFS-e', 'APIs fiscais'],
]

function ArchBlock() {
  return (
    <>
      <ArchVisual />
      <ol className="v-arch-list" aria-label="Serviços da arquitetura">
        {SERVICES.map(([name, sub]) => (
          <li key={name}>
            <strong>{name}</strong> <span>{sub}</span>
          </li>
        ))}
      </ol>
    </>
  )
}

function KioskVisual({ active }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // toca só quando a etapa está visível; com movimento reduzido, fica parado com controles
  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    if (active) v.play().catch(() => {})
    else v.pause()
  }, [active, reduced])

  return (
    <figure className="v-video">
      <video
        ref={ref}
        src={asset('/assets/video/portal-leitura.mp4')}
        poster={asset('/assets/video/portal-leitura-poster.webp')}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label="Demonstração do terminal de autoatendimento da Livraria Leitura"
      />
    </figure>
  )
}

function ResultVisual() {
  return (
    <ul className="v-result">
      {project.results.slice(0, 2).map((r, k) => (
        <li key={r.metric} style={{ '--k': k }}>
          <span className="v-result__value">{r.value}</span>
          <span className="v-result__metric">{r.metric}</span>
          <span className="v-result__desc">{r.desc}</span>
        </li>
      ))}
    </ul>
  )
}

const VISUALS = [QueueVisual, ArchBlock, KioskVisual, ResultVisual]

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
    <Link to={`/project-${project.id}`} onClick={openCase} className="text-link case__more">
      Ler o case completo <IconArrow />
    </Link>
  )

  if (!pinned) {
    return (
      <section id="case" data-section="case" className="case case--flow" aria-labelledby="case-title">
        <header className="case__head section-head" data-reveal>
          <h2 id="case-title" className="h2">Self-checkout na {project.client}</h2>
          <p className="lede"><strong>Meu case de sucesso.</strong> Um sistema em produção, do problema ao resultado medido.</p>
        </header>
        <ol className="case__flow">
          {STEPS.map((s, i) => {
            const Visual = VISUALS[i]
            return (
              <li key={s.key} className="case__flow-step" data-reveal>
                <h3 className="h3">{hl(s.title)}</h3>
                <p className="case__text">{s.text}</p>
                <div className="stage stage--static">
                  <div className="stage__layer is-active" style={{ '--lp': 1 }}><Visual active /></div>
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
          <h2 id="case-title" className="case__name">Self-checkout na {project.client}</h2>
          <p className="case__intro"><strong>Meu case de sucesso.</strong> Um sistema em produção, do problema ao resultado medido.</p>

          <div className="case__steps" aria-live="polite">
            {STEPS.map((s, i) => (
              <div key={s.key} className={`case__step${i === step ? ' is-active' : ''}`} aria-hidden={i !== step}>
                <h3 className="case__title">{hl(s.title)}</h3>
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
                  <span className="case__rail-n tnum">{i + 1}</span> {s.tag.replace(/^O |^A /, '')}
                </button>
              </li>
            ))}
          </ol>

          {caseLink}
        </div>

        <div className="stage" aria-hidden="false">
          <div className="stage__chrome" aria-hidden="true">
            <span>{STEPS[step].tag}</span>
            <span className="tnum">{step + 1} de {STEPS.length}</span>
          </div>
          {VISUALS.map((Visual, i) => (
            <div
              key={STEPS[i].key}
              className={`stage__layer${i === step ? ' is-active' : ''}${i < step ? ' is-past' : ''}`}
              aria-hidden={i !== step}
            >
              <Visual active={i === step} />
            </div>
          ))}
        </div>

        <div className={`case__scroll${step === STEPS.length - 1 ? ' is-end' : ''}`} aria-hidden="true">
          <span className="case__scroll-label">
            {step === STEPS.length - 1 ? 'Fim do case' : `Etapa ${step + 1} de ${STEPS.length} · role para ver a próxima`}
            {step < STEPS.length - 1 && <IconArrow size={14} className="case__scroll-arrow" />}
          </span>
          <span className="case__progress"><span /></span>
        </div>
      </div>
    </section>
  )
}
