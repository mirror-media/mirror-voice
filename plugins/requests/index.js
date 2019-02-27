import buildQuery from '../util/buildQuery'
import Axios from './axios'

export default ({ $axios }, inject) => {
  const _axios = new Axios($axios)

  inject('fetchAudioPromotions', params => {
    const query = buildQuery(params)
    const url = `/api/audiopromotions?${query}`
    return _axios.get(url).then(res => res)
  })
  inject('fetchSections', params => {
    const query = buildQuery(params)
    const url = `/api/sections?${query}`
    return _axios.get(url).then(res => res)
  })
  inject('fetchAlbums', params => {
    const query = buildQuery(params)
    const url = `/api/albums?${query}`
    return _axios.get(url).then(res => res)
  })
  inject('fetchPostListing', params => {
    const query = buildQuery(params)
    const url = `/api/listing?${query}`
    return _axios.get(url).then(res => res)
  })
  inject('fetchPost', params => {
    const query = buildQuery(params)
    const url = `/api/posts?${query}`
    return _axios.get(url).then(res => res)
  })
}
