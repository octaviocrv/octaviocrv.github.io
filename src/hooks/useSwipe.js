import { useRef } from 'react'

export function useSwipe(onSwipe) {
  const start = useRef(null)
  return {
    onTouchStart: (event) => {
      const touch = event.touches[0]
      start.current = { x: touch.clientX, y: touch.clientY }
    },
    onTouchEnd: (event) => {
      if (!start.current) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - start.current.x
      const dy = touch.clientY - start.current.y
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) onSwipe(dx < 0 ? 1 : -1)
      start.current = null
    },
  }
}
