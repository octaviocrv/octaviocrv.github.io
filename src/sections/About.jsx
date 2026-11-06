import { useRef, useState } from 'react'
import { education, portraits, principles } from '../data/profile'
import { IconArrow, IconArrowLeft } from '../components/Icons'

export default function About() {
  const [main] = portraits
  const principlesRef = useRef(null)
  const [principleIndex, setPrincipleIndex] = useState(0)
  const goToPrinciple = (next) => {
    const list = principlesRef.current
    const card = list?.children[next]
    if (card) list.scrollTo({ left: card.offsetLeft - list.children[0].offsetLeft, behavior: 'smooth' })
  }
  const changePrinciple = (direction) => goToPrinciple((principleIndex + direction + principles.length) % principles.length)

  return (
    <section id="sobre" data-section="sobre" className="about" aria-labelledby="about-title">
      <div className="about__grid container">
        <div className="about__photos" data-reveal>
          <figure className="about__photo about__photo--main">
            <img src={main.src} alt={main.alt} loading="lazy" width="1000" height="1340" />
          </figure>
        </div>

        <div className="about__body">
          <h2 id="about-title" className="h2" data-reveal>
            O que me move
          </h2>

          <div className="about__text" data-reveal>
            <p className="lede">
              Sou uma pessoa bastante analítica e comunicativa. Já trabalhei em várias áreas que
              funcionam como pontes e ajudaram a construir a bagagem que tenho hoje.
            </p>
            <p>
              Ao longo desses 3 anos na tecnologia, trabalhei com diferentes projetos e negócios,
              aprendendo e lidando com pessoas, jeitos e empresas diferentes. Isso me faz um
              profissional apto a entender o contexto de cada negócio, conversar com quem está
              envolvido e fazer acontecer.
            </p>
          </div>

          <div className="principles-carousel">
          <p className="carousel-hint">Arraste para o lado para ver mais</p>
          <div className="principles-controls">
            <button type="button" aria-label="Princípio anterior" onClick={() => changePrinciple(-1)}><IconArrowLeft /></button>
            <div className="principles-dots" aria-label="Escolher princípio">
              {principles.map((item, i) => (
                <button type="button" key={item.title} className={`principles-dot${principleIndex === i ? ' is-active' : ''}`}
                  aria-label={item.title} aria-current={principleIndex === i ? 'step' : undefined}
                  onClick={() => goToPrinciple(i)} />
              ))}
            </div>
            <button type="button" aria-label="Próximo princípio" onClick={() => changePrinciple(1)}><IconArrow /></button>
          </div>
          <ul className="principles" ref={principlesRef} onScroll={(e) => {
            const list = e.currentTarget
            const first = list.children[0]
            const second = list.children[1]
            const stride = second.offsetLeft - first.offsetLeft
            if (stride > 0) setPrincipleIndex(Math.round(list.scrollLeft / stride))
          }}>
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` }}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
          </div>

          <dl className="sheet" data-reveal>
            <div>
              <dt>Base</dt>
              <dd>Belo Horizonte, MG</dd>
            </div>
            {education.map((e) => (
              <div key={e.title}>
                <dt>{e.label}</dt>
                <dd>
                  {e.title} <span>{e.place}</span>
                </dd>
              </div>
            ))}
            <div>
              <dt>Idioma</dt>
              <dd>
                Inglês <span>B2 · Intermediário-avançado</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
