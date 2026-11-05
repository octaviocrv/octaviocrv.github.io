import SignalField from '../components/SignalField'
import { SectionLink } from '../components/Hud'
import { IconArrow } from '../components/Icons'
import { projectsData } from '../data/projects'
import { inProduction } from '../data/profile'

export default function Hero({ onPickTech }) {
  return (
    <section id="inicio" data-section="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Disponível para novos projetos
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="line"><span>Eu faço</span></span>
            <span className="line"><span>sistemas</span></span>
            <span className="line"><span><em>conversarem.</em></span></span>
          </h1>

          <p className="hero__lede">
            Sou <strong>Octávio Augusto</strong>, desenvolvedor Full Stack em Belo Horizonte.
            Construo interfaces em React, integrações com APIs e automações com IA — do terminal
            de autoatendimento ao atendente por voz.
          </p>

          <div className="hero__cta">
            <SectionLink id="projetos" className="btn btn--solid">
              Ver projetos <IconArrow />
            </SectionLink>
            <SectionLink id="contato" className="btn btn--ghost">
              Falar comigo
            </SectionLink>
          </div>
        </div>

        <figure className="hero__field">
          <SignalField onPick={onPickTech} />
          <figcaption className="hero__caption">
            <span>FIG. 00</span> Minha stack em produção — toque num nó para ver onde ela foi usada.
          </figcaption>
        </figure>
      </div>

      <dl className="facts">
        <div className="facts__item">
          <dt>Especialidade</dt>
          <dd>Front-end React · Integrações · Automação com IA</dd>
        </div>
        <div className="facts__item">
          <dt>Em produção</dt>
          <dd><b>{String(inProduction).padStart(2, '0')}</b> sistemas rodando em clientes reais</dd>
        </div>
        <div className="facts__item">
          <dt>Portfólio</dt>
          <dd><b>{String(projectsData.length).padStart(2, '0')}</b> projetos, do kiosk ao CRM</dd>
        </div>
        <div className="facts__item">
          <dt>Formação</dt>
          <dd>Sistemas de Informação · PUC Minas</dd>
        </div>
      </dl>
    </section>
  )
}
