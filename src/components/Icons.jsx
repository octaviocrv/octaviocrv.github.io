/*
 * Família única de ícones: grade 24, traço 1.75, pontas e junções arredondadas.
 * Tamanho padrão 16px; ícones de destaque usam 20–24px com o mesmo traço visual.
 */
const Icon = ({ size = 16, children, strokeWidth = 1.75, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
)

export const IconArrow = (p) => (
  <Icon {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></Icon>
)
export const IconArrowLeft = (p) => (
  <Icon {...p}><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></Icon>
)
export const IconArrowUp = (p) => (
  <Icon {...p}><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></Icon>
)
export const IconArrowUpRight = (p) => (
  <Icon {...p}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></Icon>
)
export const IconLock = (p) => (
  <Icon size={12} {...p}><rect x="4.5" y="11" width="15" height="10" rx="2" /><path d="M8 11V7.5a4 4 0 0 1 8 0V11" /></Icon>
)
export const IconCopy = (p) => (
  <Icon {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" /></Icon>
)
export const IconCheck = (p) => (
  <Icon {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>
)
export const IconWhatsApp = (p) => (
  <Icon {...p}>
    <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" />
    <path d="M9 8.6c.2-.5.6-.6 1-.6l.6 1.5-.6.9a5.5 5.5 0 0 0 2.6 2.6l.9-.6 1.5.6c0 .4-.1.8-.6 1a3 3 0 0 1-2.7-.2 7 7 0 0 1-2.9-2.9A3 3 0 0 1 9 8.6z" />
  </Icon>
)
export const IconLinkedIn = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5v6M8 7.5v.01M12 16.5v-3.5a2 2 0 0 1 4 0v3.5M12 10.5v6" />
  </Icon>
)
export const IconMail = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </Icon>
)
export const IconPin = (p) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
)
export const IconClose = (p) => (
  <Icon size={12} strokeWidth={2} {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>
)
