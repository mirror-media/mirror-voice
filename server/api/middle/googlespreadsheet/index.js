const express = require('express')
const router = express.Router()

const { google } = require('googleapis')

const validateSchema = require('../../../validateSchema')
const formValidate = (req, res, next) => {
  validateSchema(schemaContactForm, req.body, err => {
    if (err) {
      next(new Error(err))
    } else {
      next()
    }
  })
}

const logger = require('../../../logger')

const {
  CONTACT_SPREADSHEET_ID,
  CONTACT_SPREADSHEET_DEFAULT_RANGE
} = require('../../../config')
const { schemaContactForm } = require('./schema')
const { authGoogleAPI } = require('./auth')

router.post('/contact', formValidate, authGoogleAPI, (req, res, next) => {
  const formValues = Object.values(req.body)
  const auth = req.auth
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: CONTACT_SPREADSHEET_ID,
      range: CONTACT_SPREADSHEET_DEFAULT_RANGE,
      valueInputOption: 'RAW',
      resource: {
        majorDimension: 'ROWS',
        values: [formValues]
      }
    },
    (err, { data }) => {
      if (err) {
        logger.error(
          `[spreadsheet] The Google Sheet API returned an error while append: ${err}`
        )
        next(new Error(err))
      }
      const updates = data.updates
      if (updates) {
        res.status(200).send('Post form data to Google Sheet API successfully')
      } else {
        res.status(200).send('No updates found in Google Sheet.')
      }
    }
  )
})

module.exports = router
