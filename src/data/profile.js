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
  { src: asset('/assets/img/me/about.webp'), alt: 'Octávio Augusto trabalhando no notebook, de braços cruzados, em um escritório claro com plantas' },
]

export const education = [
  { label: 'Graduação', title: 'Sistemas de Informação', place: 'PUC Minas · Em andamento' },
  { label: 'Formação técnica', title: 'Técnico em Desenvolvimento de Sistemas', place: 'SENAI BH · CECOTEG' },
]

export const principles = [
  {
    title: 'Entender antes de construir',
    text: 'Antes de pensar na solução, procuro entender o problema, quem está envolvido e o que realmente precisa ser resolvido.',
  },
  {
    title: 'Da ideia à realidade',
    text: 'Gosto de acompanhar o processo por inteiro, das primeiras conversas aos ajustes finais, até ver tudo funcionando de verdade.',
  },
  {
    title: 'Feito para pessoas',
    text: 'Por trás de cada projeto existe alguém que vai utilizá-lo. Por isso, acredito que uma boa solução precisa fazer sentido para quem está do outro lado.',
  },
]

/* Fora do código: vida pessoal, para a seção de trajetória */
export const outside = [
  { title: 'Corrida', text: 'Já corri 15 km e pretendo fazer uma meia maratona em 2027.' },
  { title: 'Sonhos', text: 'Ter a casa própria e viajar para a Europa.' },
  { title: 'Curiosidade', text: 'Gosto de psicologia e de filosofia humana.' },
  { title: 'Gente', text: 'Sempre que possível, estou com amigos e família.' },
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
      { name: 'C#', match: ['C#'], sameLevelAs: 'React' },
      { name: 'C', match: ['C'], sameLevelAs: 'React' },
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
