import { SectionLink } from '../components/Hud'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__sig">Octávio Augusto</span>
      <span className="mono">© {new Date().getFullYear()} · Feito à mão com React + Vite</span>
      <SectionLink id="inicio" className="mono footer__top">Voltar ao topo ↑</SectionLink>
    </footer>
  )
}
