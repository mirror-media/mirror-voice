/* eslint-disable import/order */
const logger = require('../../logger')

const {
  REDIS_READ_HOST,
  REDIS_READ_PORT,
  // REDIS_WRITE_HOST,
  // REDIS_WRITE_PORT,
  REDIS_AUTH,
  REDIS_TIMEOUT
  // REDIS_MAX_CLIENT,
  // REDIS_CONNECTION_TIMEOUT
} = require('../../config')

const cache = require('express-redis-cache')({
  host: REDIS_READ_HOST,
  port: REDIS_READ_PORT,
  auth_pass: REDIS_AUTH,
  expire: REDIS_TIMEOUT
})

cache.on('connected', () => {
  logger.info('Redis connected')
})

cache.on('disconnected', () => {
  logger.info('Redis disconnected')
})

cache.on('message', message => {
  logger.info(`Redis message: ${message}`)
})

cache.on('error', error => {
  logger.error(`Redis error: ${error}`)
})

module.exports = cache
