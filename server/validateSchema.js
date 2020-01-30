const Joi = require('joi')
const logger = require('./logger')

const validate = (schema, object, callback) => {
  Joi.validate(object, schema, { allowUnknown: true }, err => {
    if (err) {
      logger.error('[schema validator] Validation fail: ', err)
      callback(err)
    } else {
      callback()
    }
  })
}

module.exports = validate
