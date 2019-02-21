import Vue from 'vue'

export const state = () => ({
  items: [],
  meta: {
    maxResults: 0,
    total: 0,
    page: 0
  }
})

export const mutations = {
  SET_ITEMS(state, items) {
    Vue.set(state, 'items', items)
  },
  SET_META(state, meta) {
    Vue.set(state, 'meta', meta)
  }
}

export const actions = {
  FETCH({ commit }) {
    return this.$fetch('/api/audiopromotions').then(res => {
      commit('SET_ITEMS', res.items)
      commit('SET_META', res.meta)
    })
  }
}
