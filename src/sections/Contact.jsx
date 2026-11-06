import { useState } from 'react'
import { CONTACT_EMAIL, links } from '../data/profile'
import { asset } from '../utils/asset'
import { IconArrow, IconArrowUpRight, IconCheck, IconCopy, IconLinkedIn, IconWhatsApp } from '../components/Icons'

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
      <div className="contact__grid container">
        <div className="contact__body">
          <h2 id="contact-title" className="contact__title" data-reveal>
            Vamos conversar?
          </h2>
          <p className="contact__lede" data-reveal>
            Acredito que boas oportunidades começam com uma conversa. Se quiser trocar uma ideia, estou à disposição.
          </p>

          <div className="doors">
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="door door--primary" data-reveal>
              <IconWhatsApp size={22} />
              <span className="door__body">
                <span className="door__title">Conversar sobre oportunidades</span>
                <span className="door__hint">Direto no WhatsApp</span>
              </span>
              <IconArrow className="door__go" size={20} />
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="door" data-reveal style={{ '--d': '80ms' }}>
              <IconLinkedIn size={22} />
              <span className="door__body">
                <span className="door__title">Ver minha trajetória</span>
                <span className="door__hint">Experiência e formação no LinkedIn</span>
              </span>
              <IconArrowUpRight className="door__go" size={20} />
            </a>
          </div>

          <div className="contact__mail" data-reveal>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button type="button" className={`copy${copied ? ' is-done' : ''}`} onClick={copy}>
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              <span aria-live="polite">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <figure className="contact__photo" data-reveal>
          <img
            src={asset('/assets/img/me/smile.webp')}
            alt="Octávio Augusto sorrindo no escritório, com um quadro de montanhas ao fundo"
            loading="lazy"
            width="800"
            height="1066"
          />
        </figure>
      </div>
    </section>
  )
}
