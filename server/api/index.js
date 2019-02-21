const express = require('express')
const router = express.Router()
const axios = require('axios')
const _ = require('lodash')
const { API_PROTOCOL, API_HOST, API_PORT, API_TIMEOUT } = require('../config')
const apiHost = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT
// const {
//   fetchFromRedis,
//   insertIntoRedis,
//   redisFetching,
//   redisFetchingRecommendNews,
//   redisWriting
// } = require('./middle/redisHandler')
// const debug = require('debug')('express:api/index')

const _axios = axios.create({
  baseURL: apiHost,
  timeout: API_TIMEOUT
  // headers: {'X-Custom-Header': 'foobar'}
})

// router.get('*', (req, res, next) => {
//   _axios.get(req.url)
//   .then(response => {
//     const { data } = response
//     res.send(data)
//   })
// })

router.get(
  '*',
  (req, res, next) => {
    req.startTime = Date.now()
    next()
  },
  // fetchFromRedis,
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  },
  (req, res, next) => {
    if (res.redis) {
      console.log(
        'Fetch data from Redis.',
        `${Date.now() - req.startTime}ms\n`,
        decodeURIComponent(req.url)
      )
      const resData = JSON.parse(res.redis)
      res.header('Cache-Control', 'public, max-age=300')
      res.json(resData)
    } else {
      res.header('Cache-Control', 'public, max-age=300')
      _axios
        .get(req.url)
        .then(response => {
          const resData = response.data
          // try {
          //   resData = response.data
          // } catch (e) {
          //   res.send(e)
          //   console.error(`>>> Got bad data from api.\n`, `>>> ${req.url}\n`, e)
          //   return
          // }
          const resNum = _.get(resData, '_meta.total')
          // if ((resNum && resNum > 0) || resNum === 0) {
          //   res.dataString = JSON.stringify(response.data)
          //   next()
          // }
          console.log(
            'Fetch data from Api.',
            `${Date.now() - req.startTime}ms ${resNum}\n`,
            `${decodeURIComponent(req.url)}\n`
          )

          res.header('Cache-Control', 'public, max-age=300')
          res.send(resData)
        })
        .catch(error => {
          const status = _.get(error, 'status') || _.get(error, 'status') || 500
          res.header('Cache-Control', 'no-cache')
          res.status(status).send(error)
          if (status !== 404) {
            console.error(
              `>>> Error occurred during fetching data from api.\n`,
              `>>> ${req.url}\n`,
              error
            )
          } else {
            console.error(`Not Found: ${req.url}`)
          }
        })
    }
  }
  // insertIntoRedis
)

module.exports = router
