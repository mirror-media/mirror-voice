const express = require('express')
const router = express.Router()
const _ = require('lodash')
const axios = require('axios')
const logger = require('../logger')

const { API_PROTOCOL, API_HOST, API_PORT, API_TIMEOUT } = require('../config')
const apiURL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`
const { readMiddle, writeMiddle } = require('./middle/redis')

// const debug = require('debug')('express:api/index')

const _axios = axios.create({
  baseURL: apiURL,
  timeout: API_TIMEOUT
})

router.get(
  '/sections',
  (req, res, next) => {
    const queryhead = _.isEmpty(req.query) ? '?' : '&'
    const urlIsAudioSiteOnly =
      req.url + queryhead + 'where={"isAudioSiteOnly":true}'
    req.url = urlIsAudioSiteOnly
    next()
  },
  readMiddle,
  (req, res, next) => {
    _axios
      .get(req.url)
      .then(response => {
        const { config } = response
        const data = _.get(response, 'data', {})

        logger.info(`Fetch data from API url: ${config.url}`)

        res.header('Cache-Control', 'public, max-age=300')
        res.data = data
        next()
      })
      .catch(error => {
        const { config } = error

        logger.error(
          `Error occurred during fetching data from API url: ${config.url}`
        )
        next(new Error(error))
      })
  },
  writeMiddle
)

router.get(
  '*',
  readMiddle,
  (req, res, next) => {
    _axios
      .get(req.url)
      .then(response => {
        const { data, config } = response

        logger.info(`Fetch data from API url: ${config.url}`)
        res.header('Cache-Control', 'public, max-age=300')
        res.data = data
        next()
      })
      .catch(error => {
        const { config } = error

        logger.error(
          `Error occurred during fetching data from API url: ${config.url}`
        )
        next(new Error(error))
      })
  },
  writeMiddle
)

module.exports = router
