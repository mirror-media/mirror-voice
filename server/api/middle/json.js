const express = require('express')
const router = express.Router()

const fetchMiddle = require('../request')({ isJson: true })

router.get('*', fetchMiddle, (req, res, next) => {
  res.send(res.data)
})

module.exports = router
