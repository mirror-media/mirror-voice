const { transports, format } = require('winston')
const { Console } = transports
const expressWinston = require('express-winston')
const isDev = process.env.NODE_ENV !== 'production'
const msg =
  'HTTP {{req.method}} {{req.url}} {{res.statusCode}} - responseTime: {{res.responseTime}} ms'

const formats = [
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
]
if (isDev) {
  // formats.push(prettyPrint({ colorize: true }))
  formats.push(format.colorize(), format.simple())
}

const messageLogger = expressWinston.logger({
  transports: [new Console()],
  format: format.combine(...formats),
  msg,
  colorize: isDev,
  meta: false
})
const errorLogger = expressWinston.errorLogger({
  transports: [new Console()],
  format: format.combine(...formats)
})

module.exports = {
  messageLogger,
  errorLogger
}
