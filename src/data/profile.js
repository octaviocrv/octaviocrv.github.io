import { projectsData } from './projects'
import { asset } from '../utils/asset'

export const CONTACT_EMAIL = 'octavio.peregrino80@gmail.com'

export const links = {
  whatsapp: 'https://wa.me/5531989184698?text=Ol%C3%A1!%20Gostaria%20de%20falar%20sobre%20um%20projeto.',
  linkedin: 'https://www.linkedin.com/in/octaviocrv',
  github: 'https://github.com/octaviocrv',
  instagram: 'https://www.instagram.com/octaviocrv',
}

export const portraits = [
  { src: asset('/assets/img/octavio-bracos.webp'), alt: 'Octávio Augusto de braços cruzados' },
  { src: asset('/assets/img/octavio-sorrindo.webp'), alt: 'Octávio Augusto sorrindo' },
  { src: asset('/assets/img/octavio-serio.webp'), alt: 'Octávio Augusto, retrato frontal' },
]

export const education = [
  { title: 'Bacharelado em Sistemas de Informação', place: 'PUC Minas' },
  { title: 'Técnico em Desenvolvimento de Sistemas', place: 'SENAI BH · CECOTEG' },
]

export const principles = [
  {
    title: 'Contexto antes do código',
    text: 'Busco compreender o contexto e identificar o que realmente precisa ser resolvido antes de escolher a ferramenta.',
  },
  {
    title: 'Da concepção à produção',
    text: 'Desenvolvo projetos desde a ideia até a implementação — interface, integrações, infraestrutura e entrega.',
  },
  {
    title: 'Negócio, pessoa e tecnologia',
    text: 'Uno visão de negócio, experiência do usuário e tecnologia para construir soluções que façam sentido na prática.',
  },
]

/* Stack agrupada. `match` lista os nomes usados em projects.tools — a contagem é derivada dos dados reais. */
export const stackGroups = [
  {
    id: 'interface',
    label: 'Interface',
    items: [
      { name: 'React', match: ['React'] },
      { name: 'Next.js', match: ['Next.js'] },
      { name: 'TypeScript', match: ['TypeScript'] },
      { name: 'JavaScript', match: ['JavaScript'] },
      { name: 'Tailwind CSS', match: ['Tailwind CSS'] },
      { name: 'HTML & CSS', match: ['HTML5', 'CSS3'] },
      { name: 'Material-UI · Shadcn', match: ['Material-UI', 'Shadcn/ui'] },
    ],
  },
  {
    id: 'backend',
    label: 'Back-end & Dados',
    items: [
      { name: 'Node.js', match: ['Node.js'] },
      { name: 'Python', match: ['Python'] },
      { name: 'REST API', match: ['REST API', 'Fetch API'] },
      { name: 'Webhooks', match: ['Webhooks'] },
      { name: 'MySQL', match: ['MySQL'] },
      { name: 'PostgreSQL', match: ['PostgreSQL'] },
    ],
  },
  {
    id: 'ia',
    label: 'Automação & IA',
    items: [
      { name: 'n8n', match: ['n8n'] },
      { name: 'OpenAI API', match: ['OpenAI API'] },
      { name: 'VAPI · Voice AI', match: ['VAPI (Voice AI)'] },
      { name: 'Twilio', match: ['Twilio'] },
      { name: 'WhatsApp API', match: ['WhatsApp API'] },
      { name: 'Pipedrive · Kommo', match: ['Pipedrive CRM', 'Kommo', 'Integração de CRM'] },
    ],
  },
  {
    id: 'infra',
    label: 'Infra & Entrega',
    items: [
      { name: 'Docker', match: ['Docker', 'Docker Compose'] },
      { name: 'Nginx', match: ['Nginx'] },
      { name: 'AWS S3', match: ['AWS S3'] },
      { name: 'Git & GitHub', match: ['Git', 'GitHub', 'GitHub Pages'] },
      { name: 'Vite', match: ['Vite'] },
    ],
  },
]

const norm = (s) => s.toLowerCase().replace(/\s*\(.*\)$/, '').trim()

export const projectUsesTech = (project, tech) => {
  if (!project.tools) return false
  const wanted = tech.match.map(norm)
  return project.tools.some((t) => wanted.some((w) => norm(t) === w || norm(t).startsWith(w + ' ')))
}

export const allTech = stackGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.id })))

export const techByName = (name) => allTech.find((t) => t.name === name)

export const techCount = (tech) => projectsData.filter((p) => projectUsesTech(p, tech)).length

export const inProduction = projectsData.filter((p) => p.status === 'Em Produção').length
