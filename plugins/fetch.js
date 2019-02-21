import { camelizeKeys } from 'humps'

export default ({ $axios }, inject) => {
  inject('fetch', url => {
    return $axios.get(url).then(res => camelizeKeys(res.data))
  })
}
