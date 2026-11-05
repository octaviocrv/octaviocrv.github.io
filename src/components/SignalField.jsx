import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/motion'

/*
 * Grafo da stack real. As arestas reproduzem fluxos que existem nos projetos:
 * kiosk (React → Nginx → Node → MySQL/S3, tudo em Docker), voz (VAPI → n8n → OpenAI/Twilio)
 * e mensageria/CRM (WhatsApp → n8n → Pipedrive). `tech` casa com os nomes da seção Stack.
 */
const NODES = [
  { id: 'ts', label: 'TypeScript', tech: 'TypeScript', x: 0.1, y: 0.1 },
  { id: 'react', label: 'React', tech: 'React', x: 0.2, y: 0.3, hub: true },
  { id: 'nginx', label: 'Nginx', tech: 'Nginx', x: 0.44, y: 0.14 },
  { id: 'node', label: 'Node.js', tech: 'Node.js', x: 0.58, y: 0.32, hub: true },
  { id: 'mysql', label: 'MySQL', tech: 'MySQL', x: 0.86, y: 0.18 },
  { id: 's3', label: 'AWS S3', tech: 'AWS S3', x: 0.9, y: 0.42 },
  { id: 'docker', label: 'Docker', tech: 'Docker', x: 0.3, y: 0.5 },
  { id: 'hooks', label: 'Webhooks', tech: 'Webhooks', x: 0.74, y: 0.54 },
  { id: 'n8n', label: 'n8n', tech: 'n8n', x: 0.54, y: 0.68, hub: true },
  { id: 'openai', label: 'OpenAI', tech: 'OpenAI API', x: 0.86, y: 0.72 },
  { id: 'vapi', label: 'VAPI · voz', tech: 'VAPI · Voice AI', x: 0.3, y: 0.82 },
  { id: 'twilio', label: 'Twilio', tech: 'Twilio', x: 0.5, y: 0.88 },
  { id: 'wpp', label: 'WhatsApp', tech: 'WhatsApp API', x: 0.08, y: 0.66 },
  { id: 'crm', label: 'Pipedrive', tech: 'Pipedrive · Kommo', x: 0.9, y: 0.94 },
  { id: 'pg', label: 'PostgreSQL', tech: 'PostgreSQL', x: 0.1, y: 0.94 },
]

const EDGES = [
  ['ts', 'react'], ['react', 'nginx'], ['nginx', 'node'], ['node', 'mysql'], ['node', 's3'],
  ['docker', 'react'], ['docker', 'node'], ['node', 'hooks'], ['hooks', 'n8n'],
  ['vapi', 'n8n'], ['n8n', 'openai'], ['n8n', 'twilio'], ['wpp', 'n8n'], ['n8n', 'crm'],
  ['pg', 'vapi'], ['hooks', 'openai'],
]

const C = {
  line: 'rgba(96,179,255,0.16)',
  lineHot: 'rgba(96,179,255,0.75)',
  node: '#60b3ff',
  ink: '#030a14',
  label: 'rgba(200,222,245,0.55)',
  labelHot: '#eaf6ff',
  packet: '#9ed2ff',
  live: '#d4ff3a',
}

/* Trilha em "Z" ortogonal: a → (mx, a.y) → (mx, b.y) → b */
function elbow(a, b) {
  const mx = (a.x + b.x) / 2
  const pts = [a, { x: mx, y: a.y }, { x: mx, y: b.y }, b]
  const segs = []
  let len = 0
  for (let i = 0; i < 3; i += 1) {
    const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y)
    segs.push(l)
    len += l
  }
  return { pts, segs, len }
}

function pointAt(path, t) {
  let d = t * path.len
  for (let i = 0; i < 3; i += 1) {
    if (d <= path.segs[i] || i === 2) {
      const k = path.segs[i] ? d / path.segs[i] : 0
      const p = path.pts[i]
      const q = path.pts[i + 1]
      return { x: p.x + (q.x - p.x) * k, y: p.y + (q.y - p.y) * k }
    }
    d -= path.segs[i]
  }
  return path.pts[3]
}

export default function SignalField({ onPick }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()
  const pickRef = useRef(onPick)
  pickRef.current = onPick

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let running = false
    let visible = true
    let last = performance.now()
    let spawnAcc = 0
    const pointer = { x: -9999, y: -9999, inside: false }
    let hover = null
    const packets = []
    const pos = new Map()
    const phase = new Map(NODES.map((n, i) => [n.id, i * 1.7]))

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!running) draw(0)
    }

    const layout = (time) => {
      const padX = Math.min(70, w * 0.08)
      const padY = Math.min(40, h * 0.06)
      NODES.forEach((n) => {
        const ph = phase.get(n.id)
        let x = padX + n.x * (w - padX * 2)
        let y = padY + n.y * (h - padY * 2)
        if (!reduced) {
          x += Math.sin(time * 0.00035 + ph) * 5
          y += Math.cos(time * 0.0003 + ph * 1.3) * 5
        }
        // o cursor afasta levemente os nós próximos — o campo "reage" sem perder a forma
        const dx = x - pointer.x
        const dy = y - pointer.y
        const d = Math.hypot(dx, dy)
        if (d < 140 && d > 0.01) {
          const f = (1 - d / 140) * 14
          x += (dx / d) * f
          y += (dy / d) * f
        }
        pos.set(n.id, { x, y })
      })
    }

    const findHover = () => {
      if (!pointer.inside) return null
      let best = null
      let bestD = 46
      NODES.forEach((n) => {
        const p = pos.get(n.id)
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y)
        if (d < bestD) {
          bestD = d
          best = n
        }
      })
      return best
    }

    const spawn = (fromId) => {
      const candidates = fromId ? EDGES.filter((e) => e.includes(fromId)) : EDGES
      const e = candidates[Math.floor(Math.random() * candidates.length)]
      const reverse = fromId ? e[1] === fromId : Math.random() < 0.35
      packets.push({ e, t: 0, speed: 0.00028 + Math.random() * 0.00024, reverse, hot: Boolean(fromId) })
    }

    function draw(time) {
      layout(time)
      hover = findHover()
      canvas.style.cursor = hover ? 'pointer' : 'default'
      ctx.clearRect(0, 0, w, h)

      const paths = new Map()
      EDGES.forEach((e) => {
        const a = pos.get(e[0])
        const b = pos.get(e[1])
        const path = elbow(a, b)
        paths.set(e, path)
        const hot = hover && e.includes(hover.id)
        ctx.beginPath()
        ctx.moveTo(path.pts[0].x, path.pts[0].y)
        for (let i = 1; i < 4; i += 1) ctx.lineTo(path.pts[i].x, path.pts[i].y)
        ctx.strokeStyle = hot ? C.lineHot : C.line
        ctx.lineWidth = hot ? 1.4 : 1
        ctx.stroke()
      })

      packets.forEach((pk) => {
        const path = paths.get(pk.e)
        const p = pointAt(path, pk.reverse ? 1 - pk.t : pk.t)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2)
        ctx.fillStyle = pk.hot ? 'rgba(212,255,58,0.12)' : 'rgba(96,179,255,0.12)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.1, 0, Math.PI * 2)
        ctx.fillStyle = pk.hot ? C.live : C.packet
        ctx.fill()
      })

      ctx.font = `500 ${w < 520 ? 10 : 11}px "JetBrains Mono", ui-monospace, monospace`
      ctx.textBaseline = 'middle'
      NODES.forEach((n) => {
        const p = pos.get(n.id)
        const isHover = hover?.id === n.id
        const linked = hover && EDGES.some((e) => e.includes(hover.id) && e.includes(n.id))
        // nós são "pads" (losangos) — a mesma forma dos nós do barramento e dos eyebrows
        const r = n.hub ? 6 : 4.2
        const pad = (size) => {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y - size)
          ctx.lineTo(p.x + size, p.y)
          ctx.lineTo(p.x, p.y + size)
          ctx.lineTo(p.x - size, p.y)
          ctx.closePath()
        }
        if (isHover) {
          pad(14)
          ctx.lineWidth = 1
          ctx.strokeStyle = 'rgba(96,179,255,0.4)'
          ctx.stroke()
        }
        pad(r)
        ctx.fillStyle = isHover ? C.live : n.hub ? '#0062b9' : C.ink
        ctx.fill()
        ctx.lineWidth = 1.25
        ctx.strokeStyle = isHover ? C.live : C.node
        ctx.stroke()

        const right = n.x < 0.8
        ctx.textAlign = right ? 'left' : 'right'
        ctx.fillStyle = isHover || linked ? C.labelHot : C.label
        const lx = p.x + (right ? 14 : -14)
        ctx.fillText(n.label.toUpperCase(), lx, p.y)
        if (isHover) {
          const cta = 'VER PROJETOS'
          const tw = ctx.measureText(cta).width
          const ty = p.y + 18
          ctx.fillStyle = C.live
          ctx.fillText(cta, lx, ty)
          // seta desenhada no mesmo traço da família de ícones
          const ax = right ? lx + tw + 6 : lx + 6
          const s = 4
          ctx.beginPath()
          ctx.moveTo(ax, ty)
          ctx.lineTo(ax + s * 2, ty)
          ctx.moveTo(ax + s, ty - s)
          ctx.lineTo(ax + s * 2, ty)
          ctx.lineTo(ax + s, ty + s)
          ctx.strokeStyle = C.live
          ctx.lineWidth = 1.5
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        }
      })
    }

    const loop = (now) => {
      const dt = Math.min(48, now - last)
      last = now
      spawnAcc += dt
      if (spawnAcc > 380 && packets.length < 28) {
        spawnAcc = 0
        spawn(hover?.id)
      }
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        packets[i].t += packets[i].speed * dt * (hover ? 1.6 : 1)
        if (packets[i].t >= 1) packets.splice(i, 1)
      }
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.inside = true
      if (!running) draw(performance.now())
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
      pointer.inside = false
      if (!running) draw(performance.now())
    }
    const onClick = (e) => {
      onMove(e)
      const n = findHover()
      if (n) pickRef.current?.(n.tech)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)

    resize()
    // semeia alguns pacotes para o campo já nascer "vivo"
    if (!reduced) for (let i = 0; i < 10; i += 1) {
      spawn()
      packets[packets.length - 1].t = Math.random()
    }
    start()
    if (reduced) draw(0)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="signal" aria-hidden="true" />
}
