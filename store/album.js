import Vue from 'vue'
import _ from 'lodash'

export const state = () => ({
  info: {},
  singles: []
})

export const mutations = {
  SET_ALBUM(state, data) {
    Vue.set(state, 'info', data)
  }
}

export const actions = {
  FETCH_ALBUM({ commit }, params) {
    const query = this.$buildQuery(params)
    const url = `/api/albums?${query}`
    return this.$fetch(url).then(res => {
      commit('SET_ALBUM', _.get(res, 'items', [])[0] || {})
      return res
    })
  }
}
