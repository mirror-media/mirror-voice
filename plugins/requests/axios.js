import { camelizeKeys } from 'humps'

export default class Axios {
  constructor($axios) {
    this.$axios = $axios
  }

  get(url) {
    return this.$axios.get(url).then(res => camelizeKeys(res.data))
  }
}
