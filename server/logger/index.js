const { createLogger, format, transports } = require('winston')

const formats = [
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
]
if (process.env.NODE_ENV !== 'production') {
  formats.push(format.colorize(), format.simple())
}

const logger = createLogger({
  level: 'info',
  format: format.combine(...formats),
  defaultMeta: { service: 'mirror-voice-frontend-server' },
  transports: [new transports.Console()]
})

module.exports = logger
