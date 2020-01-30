const _ = require('lodash')

// isAudioSiteOnly filter middleware
module.exports = (req, res, next) => {
  const queryhead = _.isEmpty(req.query) ? '?' : '&'
  const urlIsAudioSiteOnly =
    req.url + queryhead + 'where={"isAudioSiteOnly":true}'
  req.url = urlIsAudioSiteOnly
  next()
}
