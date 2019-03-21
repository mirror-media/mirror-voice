const express = require('express')
const router = express.Router()
const _ = require('lodash')
const axios = require('axios')
const logger = require('../logger')

const {
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_TIMEOUT,
  AUDIO_SECTION_NAMES
} = require('../config')
const apiURL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`
const { readMiddle, writeMiddle } = require('./middle/redis')

// const debug = require('debug')('express:api/index')

const _axios = axios.create({
  baseURL: apiURL,
  timeout: API_TIMEOUT
})

// NOTE: workaround for audio sections
router.get(
  '/sections',
  readMiddle,
  (req, res, next) => {
    _axios
      .get(req.url)
      .then(response => {
        const { config } = response
        const data = _.get(response, 'data', {})

        logger.info(`Fetch data from API url: ${config.url}`)

        res.header('Cache-Control', 'public, max-age=300')
        const audioSections = _.get(data, '_items', []).filter(section =>
          AUDIO_SECTION_NAMES.includes(section.name)
        )
        data._items = audioSections
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
