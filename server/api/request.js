const axios = require('axios')
const logger = require('../logger')

const {
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_TIMEOUT,
  JSON_PROTOCOL,
  JSON_HOST,
  JSON_PORT,
  JSON_TIMEOUT
} = require('../config')
const apiURL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`
const jsonURL = `${JSON_PROTOCOL}://${JSON_HOST}:${JSON_PORT}`

module.exports = ({ isJson = false } = {}) => {
  const fetchMiddle = (req, res, next) => {
    /*
    ** Reason why this exist, but not just using req.url:
    ** because voice_masters.json was placed at /rss not /json like others static files
    ** we need to handle that with router.use(['/json', '/rss'], require('./middle/json'))
    */
    const baseURL = isJson ? jsonURL : apiURL
    const url = isJson ? req.originalUrl.replace('/api', '') : req.url

    const timeout = isJson ? JSON_TIMEOUT : API_TIMEOUT

    const _axios = axios.create({ baseURL, timeout })

    _axios
      .get(url)
      .then(response => {
        const { data = {}, config } = response

        logger.info(`[request] Fetch data from API/JSON url: ${config.url}`)

        res.header('Cache-Control', 'public, max-age=300')
        res.data = data
        next()
      })
      .catch(error => {
        const { config } = error

        logger.error(
          `[request] Error occurred during fetching data from API/JSONS url: ${
            config.url
          }`
        )
        next(new Error(error))
      })
  }

  return fetchMiddle
}
