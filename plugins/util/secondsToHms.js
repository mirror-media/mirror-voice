import _ from 'lodash'

export default (d, { pad = {} } = {}) => {
  d = Number(d)
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)

  const padding = {
    h: _.get(pad, 'h', 2),
    m: _.get(pad, 'm', 2),
    s: _.get(pad, 's', 2)
  }

  const hDisplay =
    h > 0 ? `${h}`.padStart(padding.h, '0') : '0'.padStart(padding.h, '0')
  const mDisplay =
    m > 0 ? `${m}`.padStart(padding.m, '0') : '0'.padStart(padding.m, '0')
  const sDisplay =
    s > 0 ? `${s}`.padStart(padding.s, '0') : '0'.padStart(padding.s, '0')
  return `${hDisplay}:${mDisplay}:${sDisplay}`
}
