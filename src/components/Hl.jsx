/* Destaca a métrica principal (60–70%) sem deixá-la quebrar de linha. */
export function hl(text) {
  return text.split(/(60–70%)/).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="hl">
        {part}
      </mark>
    ) : (
      part
    )
  )
}
