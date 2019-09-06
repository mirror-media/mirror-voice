const { google } = require('googleapis')
const OAuth2Client = google.auth.OAuth2
const { GOOGLE_API_CREDENTIALS, GOOGLE_API_TOKENS } = require('../../../config')

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {
    client_secret: clientSecret,
    client_id: clientId,
    redirect_uris: redirectUris
  } = credentials.installed
  const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUris[0])

  oAuth2Client.setCredentials(GOOGLE_API_TOKENS)
  callback(oAuth2Client)
}

const authGoogleAPI = (req, res, next) => {
  authorize(GOOGLE_API_CREDENTIALS, auth => {
    req.auth = auth
    next()
  })
}

module.exports = {
  authGoogleAPI
}
