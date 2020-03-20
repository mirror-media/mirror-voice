import _ from 'lodash'
import queryString from 'query-string'

export default ({ payloadString, maxResults = 10 }) =>
  Object.assign(
    { max_results: maxResults },
    _.mapValues(queryString.parse(payloadString), (value, key) => {
      if (key === 'where') {
        return JSON.parse(value)
      } else {
        return value
      }
    })
  )
