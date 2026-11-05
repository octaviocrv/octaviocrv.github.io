import { stackGroups, techCount } from '../data/profile'

export default function Stack({ activeTech, onPick }) {
  return (
    <section id="stack" data-section="stack" className="stack" aria-labelledby="stack-title">
      <header className="stack__head">
        <div data-reveal>
          <p className="eyebrow">03 — Stack</p>
          <h2 id="stack-title" className="h2">
            Ferramentas, <em>com recibo.</em>
          </h2>
        </div>
        <p className="stack__intro" data-reveal>
          Nada de barra de porcentagem. Cada tecnologia mostra em quantos projetos deste portfólio
          ela foi usada — clique para ver quais.
        </p>
      </header>

      <div className="stack__grid">
        {stackGroups.map((g, gi) => (
          <div key={g.id} className="stack__col" data-reveal style={{ '--d': `${gi * 80}ms` }}>
            <h3 className="stack__group mono">
              <span>{String(gi + 1).padStart(2, '0')}</span> {g.label}
            </h3>
            <ul>
              {g.items.map((t) => {
                const n = techCount(t)
                const active = activeTech === t.name
                return (
                  <li key={t.name}>
                    <button
                      type="button"
                      className={`spec${active ? ' is-active' : ''}`}
                      onClick={() => onPick(t.name)}
                      disabled={n === 0}
                      aria-label={`${t.name}: usado em ${n} projeto${n === 1 ? '' : 's'}. Ver projetos.`}
                    >
                      <span className="spec__name">{t.name}</span>
                      <span className="spec__dots" aria-hidden="true" />
                      <span className="spec__n mono">×{n}</span>
                      <span className="spec__bar" style={{ '--n': n }} aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
