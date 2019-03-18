const express = require('express')
const router = express.Router()
const axios = require('axios')
// const _ = require('lodash')

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
      console.log('Fetch data from API')

      const { data } = response
      res.header('Cache-Control', 'public, max-age=300')
      res.send(data)
    })
    .catch(error => {
      console.log(
        `Error occurred during fetching data from API url: ${apiURL}/${req.url}`
      )

      const { status = 500 } = error
      res.header('Cache-Control', 'no-cache')
      res.status(status).send(error)
    })
})

module.exports = router
