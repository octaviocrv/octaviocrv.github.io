import { education, portraits, principles } from '../data/profile'

export default function About() {
  const [main] = portraits

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

          <ul className="principles">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` }}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>

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
