const Joi = require('joi')

module.exports = {
  schemaContactForm: Joi.object().keys({
    formTime: Joi.date().required(),
    formName: Joi.string()
      .required()
      .min(1),
    formTel: Joi.string()
      .allow('')
      .optional(),
    formEmail: Joi.string()
      .email()
      .required()
      .min(1),
    formCategory: Joi.string()
      .required()
      .min(1),
    formTitle: Joi.string()
      .required()
      .min(1),
    formContent: Joi.string()
      .required()
      .min(1)
  })
}
