import Vue from 'vue'
import _ from 'lodash'

export const state = () => ({
  albumId: '',
  items: [],
  meta: {
    maxResults: 0,
    total: 0,
    page: 0
  }
})

export const mutations = {
  SET_ALBUM_ID(state, id) {
    Vue.set(state, 'albumId', id)
  },
  SET_ITEMS(state, items) {
    Vue.set(state, 'items', items)
  },
  SET_META(state, meta) {
    Vue.set(state, 'meta', meta)
  }
}

export const actions = {
  FETCH({ commit }, params) {
    const albumId = _.get(params, ['where', 'albums', '$in', 0], '')
    const query = this.$buildQuery(params)
    const url = `/api/listing?${query}`
    return this.$fetch(url).then(res => {
      commit('SET_ALBUM_ID', albumId)
      commit('SET_ITEMS', res.items)
      commit('SET_META', res.meta)
      return res
    })
  }
}
