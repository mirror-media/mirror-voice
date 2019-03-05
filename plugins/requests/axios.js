import { camelizeKeys } from 'humps'

export default class Axios {
  constructor($axios) {
    this.$axios = $axios
    this.$axios.onRequest(config => {
      if (process.browser) {
        config.url = `//${location.host}${config.url}`
      }
    })
  }

  get(url) {
    return this.$axios.get(url).then(res => camelizeKeys(res.data))
  }
}
