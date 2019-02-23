import Vue from 'vue'
import _ from 'lodash'

export const state = () => ({
  info: {}
})

export const mutations = {
  SET_SINGLE(state, data) {
    Vue.set(state, 'info', data)
  }
}

export const actions = {
  FETCH_SINGLE({ commit }, params) {
    const query = this.$buildQuery(params)
    const url = `/api/posts?${query}`
    return this.$fetch(url).then(res => {
      commit('SET_SINGLE', _.get(res, 'items', [])[0] || {})
      return res
    })
  }
}
