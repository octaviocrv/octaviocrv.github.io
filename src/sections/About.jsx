import { useState } from 'react'
import { education, portraits, principles } from '../data/profile'

export default function About() {
  const [pose, setPose] = useState(0)
  const next = () => setPose((p) => (p + 1) % portraits.length)

  return (
    <section id="sobre" data-section="sobre" className="about" aria-labelledby="about-title">
      <div className="about__grid">
        <figure className="portrait" data-reveal>
          <button type="button" className="portrait__frame" onClick={next} aria-label="Trocar foto">
            {portraits.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={i === pose ? p.alt : ''}
                className={i === pose ? 'is-current' : ''}
                loading="lazy"
                width="820"
                height="980"
              />
            ))}
            <span className="portrait__grid" aria-hidden="true" />
          </button>
          <figcaption className="portrait__caption mono">
            <span>FIG. 0{pose + 1} / 0{portraits.length}</span>
            <span>Clique para trocar</span>
          </figcaption>
        </figure>

        <div className="about__body">
          <p className="eyebrow" data-reveal>04 — Sobre</p>
          <h2 id="about-title" className="h2" data-reveal>
            Por trás <em>do código.</em>
          </h2>

          <div className="about__text" data-reveal>
            <p className="about__lead">
              Atuo na interseção entre tecnologia e resolução de problemas, transformando
              necessidades reais em soluções digitais funcionais, bem estruturadas e pensadas
              para gerar valor.
            </p>
            <p>
              Com base em Belo Horizonte (MG), sou desenvolvedor de sistemas com foco em
              aplicações web, automações e integração com APIs. Desenvolvo interfaces modernas e
              construo automações que conectam necessidades de negócio a soluções práticas e
              eficientes.
            </p>
          </div>

          <ol className="principles">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 90}ms` }}>
                <span className="principles__n mono">0{i + 1}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="sheet" data-reveal>
            <div>
              <dt className="mono">Base</dt>
              <dd>Belo Horizonte, MG</dd>
            </div>
            {education.map((e) => (
              <div key={e.title}>
                <dt className="mono">Formação</dt>
                <dd>
                  {e.title} <span>{e.place}</span>
                </dd>
              </div>
            ))}
            <div>
              <dt className="mono">Idioma</dt>
              <dd>
                Inglês <span>B2 · Intermediário superior</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
