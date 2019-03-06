import qs from 'qs'

export default (params = {}) => {
  let query = {}
  const whitelist = [
    'where',
    'embedded',
    'max_results',
    'page',
    'sort',
    'related',
    'clean',
    'clientInfo',
    'id',
    'writers'
  ]
  whitelist.forEach(ele => {
    if (params.hasOwnProperty(ele)) {
      if (ele === 'where' || ele === 'embedded') {
        query[ele] = JSON.stringify(params[ele])
      } else if (ele === 'id') {
        query[ele] =
          typeof params[ele] === 'string' ? params[ele] : params[ele].join(',')
      } else {
        query[ele] = params[ele]
      }
    }
  })
  query = qs.stringify(query)
  return query
}
