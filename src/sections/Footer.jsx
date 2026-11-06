import { links } from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__name">Octávio Augusto</span>
        <ul className="footer__links">
          <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
        <span className="footer__copy">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
