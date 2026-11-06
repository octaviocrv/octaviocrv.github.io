---
name: Octávio Augusto — Portfólio
description: Portfólio de desenvolvedor full stack, claro e preciso; as fotos reais são o calor.
colors:
  bg: "#ffffff"
  bg-2: "#f6f7f9"
  bg-3: "#eceff3"
  ink: "#0b1220"
  ink-2: "#3a4354"
  ink-3: "#5b6474"
  line: "#e3e6eb"
  line-2: "#cfd5de"
  accent: "#2448d8"
  accent-hover: "#1a39b8"
  accent-soft: "#ecf0ff"
  accent-deep: "#1c37b0"
  c-interface: "#2448d8"
  c-backend: "#0b8577"
  c-ia: "#6a45d6"
  c-infra: "#c9860f"
  sand: "#f7f0e6"
  sand-line: "#eadfce"
  live: "#0b7a53"
  live-soft: "#e6f5ee"
  night: "#0b1220"
  night-2: "#151e31"
  night-line: "#26314a"
  night-ink: "#edf1f7"
  night-ink-2: "#a8b3c6"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 5.2vw, 5.5rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.25rem)"
    fontWeight: 620
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 560
  code:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.8125rem"
rounded:
  sm: "8px"
  md: "14px"
  lg: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 40px)"
  section: "clamp(88px, 11vw, 160px)"
  container: "1200px"
  header: "68px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  chip:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 16px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  status-live:
    backgroundColor: "{colors.live-soft}"
    textColor: "{colors.live}"
    rounded: "{rounded.pill}"
    height: "26px"
  door-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.md}"
    padding: "22px"
  door:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.md}"
    padding: "22px"
---

## Overview

O padrão da categoria executado com acabamento alto, com a Stripe como régua. Página clara, tipografia precisa, uma única cor de ação e muito espaço. O calor vem só das fotos reais do escritório (madeira, plantas, luz âmbar). A página fecha numa faixa azul-marinho com duas portas de contato: cliente (WhatsApp) e recrutador (LinkedIn).

## Colors

- **Neutros** (`bg`, `bg-2`, `bg-3`, `line`, `line-2`): branco e cinzas frios. `bg-2` marca seções alternadas (case, sobre).
- **Tinta** (`ink`, `ink-2`, `ink-3`): azul-marinho quase preto. `ink-3` é o mínimo para texto secundário (≥4.5:1 em `bg` e `bg-2`).
- **Ação** (`accent`): azul para botões primários, links, estado ativo e o dado em destaque. Nunca como decoração.
- **Região de cor** (`accent-deep`): a seção do case é um campo azul pleno com texto branco, a única grande região saturada da página.
- **Categorias** (`c-interface`, `c-backend`, `c-ia`, `c-infra`): marcam os grupos da stack (borda superior, quadradinho, barras) e a categoria dos projetos (bolinha). Sempre acompanhadas do nome.
- **Areia** (`sand`): o calor da madeira e da luz âmbar das fotos, usado como chão da seção "Sobre".
- **Produção** (`live`): verde só no selo "Em produção".
- **Noite** (`night*`): somente a faixa de contato e o rodapé.

## Typography

Uma família só, Geist, auto-hospedada. A escala é display → headline → title → lede → body → label. Os títulos usam tracking negativo (mínimo -0.04em) e `text-wrap: balance`. A Geist Mono fica restrita a código e nomes de eventos/arquivos, nunca a rótulos decorativos. Números de dados usam `tabular-nums`.

## Layout

- Container de 1200px com gutter fluido; seções separadas por `spacing.section`.
- Hero em 7/5 (texto e retrato). Case fixo (sticky) em 5/7 no desktop, com quatro etapas.
- Trabalhos em lista de linhas (thumb, nome e descrição, categoria, status). Stack numa grade de 4→2→1 colunas.
- Breakpoints: 960, 900, 860, 640, 600, 520px.

## Elevation & Depth

As sombras sempre têm deslocamento e desfoque suave: `shadow-sm` para controles, `shadow` para legendas flutuantes e `shadow-lg` para fotos e para o palco do case. Bordas de 1px (`line`) separam linhas e colunas. O header fica translúcido com blur só para ler o conteúdo que passa por baixo.

## Shapes

Botões, chips e selos são pílulas. Painéis e portas usam 14px. Fotos, palco e grade de stack usam 22px. Nada de chanfros, cantos de mira ou molduras técnicas.

## Components

- **Botões:** o primário é azul com sombra azul suave; o secundário é branco com anel de 1px. A seta do botão desliza 3px no hover.
- **Linha de projeto:** no hover, o nome e a seta ficam azuis e a thumb amplia 5%. No desktop, uma prévia flutuante segue o cursor.
- **Chips de filtro:** o ativo é tinta sólida; o filtro por tecnologia ativo é azul.
- **Palco do case:** janela branca com barra de título (etapa + "n de 4"); as camadas entram com crossfade.
- **Portas de contato:** dois blocos lado a lado na faixa noturna. O primário é azul.

## Do's and Don'ts

- Use fotos reais aprovadas (série do escritório em `fotos/`), sem repetir a mesma foto na página.
- Use o azul para ação e o azul profundo como única região saturada; o verde só para "Em produção"; as cores de categoria só com o texto da categoria ao lado.
- Mostre números medidos (`projects.js`) e diga quando uma escala é relativa.
- Não use eyebrows ou kickers sobre títulos, nem numeração de seção decorativa.
- Não use monoespaçada como fantasia "técnica", nem fundo escuro com neon, grades de HUD, brilho ou gradiente em texto.
- Não invente depoimentos, clientes ou métricas.
