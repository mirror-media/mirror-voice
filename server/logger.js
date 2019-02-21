const { transports, format } = require('winston')
const { Console } = transports
const { combine, timestamp, json, simple, prettyPrint } = format
const expressWinston = require('express-winston')
const isDev = process.env.NODE_ENV !== 'production'
const msg =
  'HTTP {{req.method}} {{req.url}} {{res.statusCode}} - responseTime: {{res.responseTime}} ms'

const formats = [timestamp(), json()]
if (isDev) {
  formats.push(prettyPrint({ colorize: true }))
}

const messageLogger = expressWinston.logger({
  transports: [new Console()],
  format: combine(timestamp(), simple()),
  msg,
  colorize: isDev,
  meta: false
})
const fullLogger = expressWinston.logger({
  transports: [new Console()],
  format: combine(...formats),
  msg
})
const errorLogger = expressWinston.errorLogger({
  transports: [new Console()],
  format: combine(...formats)
})

module.exports = {
  messageLogger,
  fullLogger,
  errorLogger
}
