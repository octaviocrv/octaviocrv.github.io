const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const IconArrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
)
export const IconArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
)
export const IconLock = (p) => (
  <svg {...base} width="12" height="12" {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
)
export const IconCopy = (p) => (
  <svg {...base} {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></svg>
)
export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M5 12l5 5 9-10" /></svg>
)
export const IconClose = (p) => (
  <svg {...base} width="12" height="12" {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
