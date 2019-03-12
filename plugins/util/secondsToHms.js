export default d => {
  d = Number(d)
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)

  const hDisplay = h > 0 ? `${h}`.padStart(2, '0') : '00'
  const mDisplay = m > 0 ? `${m}`.padStart(2, '0') : '00'
  const sDisplay = s > 0 ? `${s}`.padStart(2, '0') : '00'
  return `${hDisplay}:${mDisplay}:${sDisplay}`
}
