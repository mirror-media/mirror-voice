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

const readRedis = require('express-redis-cache')({
  host: REDIS_READ_HOST,
  port: REDIS_READ_PORT,
  auth_pass: REDIS_AUTH,
  expire: REDIS_TIMEOUT,
  prefix: REDIS_KEY_PREFIX
})
const writeRedis = require('express-redis-cache')({
  host: REDIS_WRITE_HOST,
  port: REDIS_WRITE_PORT,
  auth_pass: REDIS_AUTH,
  expire: REDIS_TIMEOUT,
  prefix: REDIS_KEY_PREFIX
})

let read
let write
if (process.env.NODE_ENV === 'production') {
  read = readRedis
  read.on('connected', () => {
    logger.info('[redis] Redis Read Server connected')
  })
  read.on('disconnected', () => {
    logger.info('[redis] Redis Read Server disconnected')
  })
  read.on('message', message => {
    logger.info(`[redis] Redis Read Server message: ${message}`)
  })
  read.on('error', error => {
    logger.error(`[redis] Redis Read Server error: ${error}`)
  })

  write = writeRedis
  write.on('connected', () => {
    logger.info('[redis] Redis Write Server connected')
  })
  write.on('disconnected', () => {
    logger.info('[redis] Redis Write Server disconnected')
  })
  write.on('message', message => {
    logger.info(`[redis] Redis Write Server message: ${message}`)
  })
  write.on('error', error => {
    logger.error(`[redis] Redis Write Server error: ${error}`)
  })
} else {
  read = {
    get(entry, callback) {
      logger.info(`[redis] Skip the redis get in dev env of entry: ${entry}`)
      callback(null, [])
    }
  }

  write = {
    add(entry, data, option, callback) {
      logger.info(`[redis] Skip the redis write in dev env of entry: ${entry}`)
      callback(null)
    }
  }
}

const readMiddle = (req, res, next) => {
  const entry = req.url
  read.get(entry, (error, entries = []) => {
    if (error) {
      logger.error(
        `[redis] Error occurred during fetching data from Redis Read Server, entry: ${entry}`
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
          `[redis] Error occurred during writing data to Redis Write Server, entry: ${entry}`
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
