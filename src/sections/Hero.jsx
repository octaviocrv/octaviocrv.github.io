import { links } from '../data/profile'
import { asset } from '../utils/asset'
import { IconArrow, IconLinkedIn, IconPin, IconWhatsApp } from '../components/Icons'

const liveClients = ['Garimpo Auto', 'Lead Finder', 'Sites, assistentes com IA e automações que simplificam processos.']

export default function Hero() {
  return (
    <section id="inicio" data-section="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid container">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line"><span>Muito prazer,</span></span>
            <span className="hero__line"><span className="hero__accent">sou Octávio.</span></span>
          </h1>

          <p className="lede hero__lede">
            Seja bem-vindo por aqui! Sou desenvolvedor e atuo na área de tecnologia há 3 anos.
            Atualmente, trabalho com desenvolvimento full stack, transformando ideias em aplicações
            que funcionam de verdade. Em sistemas, integrações e automações, participo de todo o
            processo, da ideia à produção.
          </p>

          <div className="hero__cta">
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary">
              <IconWhatsApp size={18} /> Conversar sobre oportunidades
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn--secondary">
              <IconLinkedIn size={18} /> Ver trajetória no LinkedIn
            </a>
          </div>

          <div className="hero__proof">
            <p className="hero__proof-label">Em produção:</p>
            <ul>
              {liveClients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="hero__photo">
            <img
              src={asset('/assets/img/me/hero-cutout.webp')}
              srcSet={`${asset('/assets/img/me/hero-cutout-sm.webp')} 600w, ${asset('/assets/img/me/hero-cutout.webp')} 1008w`}
              sizes="(max-width: 860px) 92vw, 40vw"
              alt="Octávio Augusto sorrindo, de braços cruzados, com camisa polo preta"
              width="1008"
              height="1350"
              fetchPriority="high"
            />
          </div>
          <figcaption className="hero__caption">
            <IconPin size={16} />
            <span>
              Belo Horizonte, MG
              <small>Disponível para vagas e projetos</small>
            </span>
          </figcaption>
        </figure>
      </div>

      <a href="#case" className="hero__next container" onClick={(e) => {
        e.preventDefault()
        document.getElementById('case')?.scrollIntoView({ behavior: 'smooth' })
      }}>
        Vem conhecer meu trabalho! <IconArrow size={16} />
      </a>
    </section>
  )
}
