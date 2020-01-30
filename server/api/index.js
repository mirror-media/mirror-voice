const express = require('express')
const router = express.Router()
const addIsAudioSiteOnlyMiddle = require('./middle/isAudioSiteOnly')
const { readMiddle, writeMiddle } = require('./middle/redis')
const fetchMiddle = require('./request')()

// const debug = require('debug')('express:api/index')

router.use('/googlespreadsheet', require('./middle/googlespreadsheet'))

// Routes for fetching static jsons
router.use(['/json', '/rss'], require('./middle/json'))

router.get('/audiochoices', readMiddle, fetchMiddle, writeMiddle)

router.get('*', addIsAudioSiteOnlyMiddle, readMiddle, fetchMiddle, writeMiddle)

module.exports = router
