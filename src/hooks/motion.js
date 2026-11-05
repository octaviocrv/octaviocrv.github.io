import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

const query = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function useMediaQuery(q) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const onChange = () => setMatch(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [q])
  return match
}

/** Adiciona .is-in aos elementos [data-reveal] dentro do root quando entram na tela. */
export function useRevealAll(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Progresso 0→1 de um elemento alto atravessando a viewport (para seções "pinadas").
 * Escreve --p no próprio elemento (sem re-render) e chama onStep quando o passo inteiro muda.
 */
export function useScrollProgress(ref, { steps = 1, onStep, enabled = true } = {}) {
  const stepRef = useRef(-1)
  const cb = useRef(onStep)
  cb.current = onStep
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      el.style.setProperty('--p', p.toFixed(4))
      const s = Math.min(steps - 1, Math.floor(p * steps))
      const local = p * steps - s
      el.style.setProperty('--lp', Math.min(1, local * 1.35).toFixed(4))
      if (s !== stepRef.current) {
        stepRef.current = s
        cb.current?.(s)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, steps, enabled])
}

/** Navegação com View Transitions API quando disponível. */
export function withViewTransition(fn) {
  const reduce = window.matchMedia(query).matches
  if (!document.startViewTransition || reduce) {
    fn()
    return
  }
  document.startViewTransition(() => {
    flushSync(fn)
  })
}
