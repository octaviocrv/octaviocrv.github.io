import { SectionLink } from '../components/Hud'
import { links } from '../data/profile'
import { IconArrowUp } from '../components/Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__name">Octávio Augusto</span>
        <ul className="footer__links">
          <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
        </ul>
        <span className="footer__copy">© {new Date().getFullYear()} · Feito com React e Vite</span>
        <SectionLink id="inicio" className="footer__top">
          Voltar ao topo <IconArrowUp size={14} />
        </SectionLink>
      </div>
    </footer>
  )
}
