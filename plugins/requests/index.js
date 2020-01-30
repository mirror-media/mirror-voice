import buildQuery from '../util/buildQuery'
import Axios from './axios'

export default ({ $axios }, inject) => {
  const _axios = new Axios($axios)
  const get = url =>
    _axios
      .get(url)
      .then(res => res)
      .catch(err => {
        throw err
      })

  // Fetchs from api
  inject('fetchAudioPromotions', params => {
    const query = buildQuery(params)
    const url = `/api/audiopromotions?${query}`
    return get(url)
  })
  inject('fetchAudioChoices', params => {
    const query = buildQuery(params)
    const url = `/api/audiochoices?${query}`
    return get(url)
  })
  inject('fetchSections', params => {
    const query = buildQuery(params)
    const url = `/api/sections?${query}`
    return get(url)
  })
  inject('fetchAlbums', params => {
    const query = buildQuery(params)
    const url = `/api/albums?${query}`
    return get(url)
  })
  inject('fetchSingle', params => {
    const query = buildQuery(params)
    const url = `/api/posts?${query}`
    return get(url)
  })

  // Fetchs from json on google cloud storage
  inject('fetchPopularVoice', () => {
    const url = '/api/json/popular_voice.json'
    return get(url)
  })
  inject('fetchVoiceMasters', () => {
    const url = '/api/rss/voice_masters.json'
    return get(url)
  })
  inject('fetchCategoriesShowcase', () => {
    const url = '/api/json/albums_posts_voice.json'
    return get(url)
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
