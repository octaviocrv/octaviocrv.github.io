import { useRef, useState } from 'react'
import { IconArrow, IconArrowLeft } from '../components/Icons'
import { stackGroups, techByName, techCount } from '../data/profile'

export default function Stack({ activeTech, onPick }) {
  const gridRef = useRef(null)
  const [groupIndex, setGroupIndex] = useState(0)
  const goToGroup = (i) => {
    const grid = gridRef.current
    grid.scrollTo({ left: grid.children[i].offsetLeft - grid.children[0].offsetLeft, behavior: 'smooth' })
  }
  return (
    <section id="stack" data-section="stack" className="stack container" aria-labelledby="stack-title">
      <header className="section-head section-head--split" data-reveal>
        <h2 id="stack-title" className="h2">O que uso, onde usei</h2>
        <p className="lede">
          Projetos deste portfólio que usam cada tecnologia. Clique para filtrar.
        </p>
      </header>

      <p className="carousel-hint">Arraste para o lado para ver mais</p>
      <div className="stack__grid" ref={gridRef} onScroll={(e) => {
        const grid = e.currentTarget
        const stride = grid.children[1].offsetLeft - grid.children[0].offsetLeft
        if (stride > 0) setGroupIndex(Math.round(grid.scrollLeft / stride))
      }}>
        {stackGroups.map((g, gi) => (
          <div key={g.id} className="stack__col" data-group={g.id} data-reveal style={{ '--d': `${gi * 80}ms` }}>
            <h3 className="stack__group">{g.label}</h3>
            <ul>
              {g.items.map((t) => {
                const n = techCount(t)
                // C e C# entram no mesmo nível de uso do React; sem projetos listados, não filtram
                const level = t.sameLevelAs ? techCount(techByName(t.sameLevelAs)) : n
                const pinned = Boolean(t.sameLevelAs) && n === 0
                const active = activeTech === t.name
                return (
                  <li key={t.name}>
                    <button
                      type="button"
                      className={`spec${active ? ' is-active' : ''}${pinned ? ' is-pinned' : ''}`}
                      onClick={() => onPick(t.name)}
                      disabled={n === 0}
                      aria-label={pinned ? `${t.name}: tecnologia do dia a dia, no mesmo nível do React.` : `${t.name}: usado em ${n} projeto${n === 1 ? '' : 's'}. Ver projetos.`}
                    >
                      <span className="spec__name">{t.name}</span>
                      <span className="spec__bar" style={{ '--n': level }} aria-hidden="true" />
                      <span className="spec__n tnum">{pinned ? '·' : n}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="stack__controls principles-controls">
        <button type="button" aria-label="Grupo anterior" onClick={() => goToGroup((groupIndex - 1 + stackGroups.length) % stackGroups.length)}><IconArrowLeft /></button>
        <div className="principles-dots">
          {stackGroups.map((group, i) => <button type="button" key={group.id} className={`principles-dot${i === groupIndex ? ' is-active' : ''}`} aria-label={group.label} aria-current={i === groupIndex ? 'step' : undefined} onClick={() => goToGroup(i)} />)}
        </div>
        <button type="button" aria-label="Próximo grupo" onClick={() => goToGroup((groupIndex + 1) % stackGroups.length)}><IconArrow /></button>
      </div>
    </section>
  )
}
