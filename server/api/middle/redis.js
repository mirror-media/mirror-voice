/* eslint-disable import/order */
const _ = require('lodash')
const logger = require('../../logger')

const {
  REDIS_READ_HOST,
  REDIS_READ_PORT,
  REDIS_WRITE_HOST,
  REDIS_WRITE_PORT,
  REDIS_AUTH,
  REDIS_TIMEOUT,
  REDIS_KEY_PREFIX
  // REDIS_MAX_CLIENT,
  // REDIS_CONNECTION_TIMEOUT
} = require('../../config')

const read = require('express-redis-cache')({
  host: REDIS_READ_HOST,
  port: REDIS_READ_PORT,
  auth_pass: REDIS_AUTH,
  expire: REDIS_TIMEOUT,
  prefix: REDIS_KEY_PREFIX
})
read.on('connected', () => {
  logger.info('Redis Read Server connected')
})
read.on('disconnected', () => {
  logger.info('Redis Read Server disconnected')
})
read.on('message', message => {
  logger.info(`Redis Read Server message: ${message}`)
})
read.on('error', error => {
  logger.error(`Redis Read Server error: ${error}`)
})

const write = require('express-redis-cache')({
  host: REDIS_WRITE_HOST,
  port: REDIS_WRITE_PORT,
  auth_pass: REDIS_AUTH,
  expire: REDIS_TIMEOUT,
  prefix: REDIS_KEY_PREFIX
})
write.on('connected', () => {
  logger.info('Redis Write Server connected')
})
write.on('disconnected', () => {
  logger.info('Redis Write Server disconnected')
})
write.on('message', message => {
  logger.info(`Redis Write Server message: ${message}`)
})
write.on('error', error => {
  logger.error(`Redis Write Server error: ${error}`)
})

const readMiddle = (req, res, next) => {
  const entry = req.url
  read.get(entry, (error, entries = []) => {
    if (error) {
      logger.error(
        `Error occurred during fetching data from Redis Read Server, entry: ${entry}`
      )
      next(new Error(error))
    }

    if (entries.length === 0) {
      next()
    } else {
      const body = JSON.parse(_.get(entries, [0, 'body'], ''))
      res.send(body)
    }
  })
}

const writeMiddle = (req, res, next) => {
  const entry = req.url
  write.add(
    entry,
    JSON.stringify(res.data),
    { expire: REDIS_TIMEOUT, type: 'json' },
    error => {
      if (error) {
        logger.error(
          `Error occurred during writing data to Redis Write Server, entry: ${entry}`
        )
        next(new Error(error))
      }

      res.send(res.data)
    }
  )
}

module.exports = {
  readMiddle,
  writeMiddle
}
