import buildQuery from '../util/buildQuery'
import Axios from './axios'

export default ({ $axios }, inject) => {
  const _axios = new Axios($axios)

  inject('fetchAudioPromotions', params => {
    const query = buildQuery(params)
    const url = `/api/audiopromotions?${query}`
    return _axios
      .get(url)
      .then(res => res)
      .catch(err => {
        throw err
      })
  })
  inject('fetchSections', params => {
    const query = buildQuery(params)
    const url = `/api/sections?${query}`
    return _axios
      .get(url)
      .then(res => res)
      .catch(err => {
        throw err
      })
  })
  inject('fetchAlbums', params => {
    const query = buildQuery(params)
    const url = `/api/albums?${query}`
    return _axios
      .get(url)
      .then(res => res)
      .catch(err => {
        throw err
      })
  })
  inject('fetchSingle', params => {
    const query = buildQuery(params)
    const url = `/api/posts?${query}`
    return _axios
      .get(url)
      .then(res => res)
      .catch(err => {
        throw err
      })
  })

  inject('postContact', params => {
    const url = `/api/googlespreadsheet/contact`
    return _axios
      .post(url, params)
      .then(res => res)
      .catch(err => {
        throw err
      })
  })
}
