import { useState } from 'react'
import { CONTACT_EMAIL, links } from '../data/profile'
import { IconArrowUpRight, IconCheck, IconCopy } from '../components/Icons'

const CHANNELS = [
  { label: 'WhatsApp', hint: 'Papo rápido e direto', href: links.whatsapp },
  { label: 'LinkedIn', hint: 'Trajetória e conexões', href: links.linkedin },
  { label: 'GitHub', hint: 'Código aberto', href: links.github },
  { label: 'Instagram', hint: '@octaviocrv', href: links.instagram },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`
    }
  }

  return (
    <section id="contato" data-section="contato" className="contact" aria-labelledby="contact-title">
      <p className="eyebrow" data-reveal>05 — Contato</p>
      <h2 id="contact-title" className="contact__title" data-reveal>
        Bora <em>conversar?</em>
      </h2>
      <p className="contact__lede" data-reveal>
        Seja para discutir arquitetura front-end, uma integração, uma automação com IA ou uma nova
        oportunidade — escolha o canal.
      </p>

      <div className="contact__grid">
        <div className="terminal" data-reveal>
          <div className="terminal__bar mono" aria-hidden="true">
            <span className="terminal__dots"><i /><i /><i /></span>
            octavio@bh: ~
          </div>
          <div className="terminal__body mono">
            <p><span className="terminal__prompt">$</span> ping octavio</p>
            <p className="terminal__out">
              <span className="live-dot" aria-hidden="true" /> online · disponível para novos projetos
            </p>
            <p className="terminal__out">resposta em até 24h · Belo Horizonte, MG</p>
          </div>
          <div className="terminal__mail">
            <a href={`mailto:${CONTACT_EMAIL}`} className="terminal__email">
              {CONTACT_EMAIL}
            </a>
            <button type="button" className={`btn btn--small${copied ? ' is-done' : ''}`} onClick={copy}>
              {copied ? <IconCheck /> : <IconCopy />}
              <span aria-live="polite">{copied ? 'Copiado' : 'Copiar e-mail'}</span>
            </button>
          </div>
        </div>

        <ul className="channels">
          {CHANNELS.map((c, i) => (
            <li key={c.label} data-reveal style={{ '--d': `${i * 70}ms` }}>
              <a href={c.href} target="_blank" rel="noreferrer" className="channel">
                <span className="channel__n mono">0{i + 1}</span>
                <span className="channel__label">{c.label}</span>
                <span className="channel__hint">{c.hint}</span>
                <IconArrowUpRight className="channel__icon" width="22" height="22" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
