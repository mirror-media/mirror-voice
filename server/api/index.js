const express = require('express')
const router = express.Router()
const axios = require('axios')
// const _ = require('lodash')
const logger = require('../logger')

const { API_PROTOCOL, API_HOST, API_PORT, API_TIMEOUT } = require('../config')
const apiURL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`
const cache = require('./middle/redis')

// const debug = require('debug')('express:api/index')

const _axios = axios.create({
  baseURL: apiURL,
  timeout: API_TIMEOUT
})

router.get('*', cache.route(), (req, res, next) => {
  _axios
    .get(req.url)
    .then(response => {
      logger.info('Fetch data from API')

      const { data } = response
      res.header('Cache-Control', 'public, max-age=300')
      res.send(data)
    })
    .catch(error => {
      logger.error(
        `Error occurred during fetching data from API url: ${error.config.url}`
      )
      next(new Error(error))
    })
})

module.exports = router
