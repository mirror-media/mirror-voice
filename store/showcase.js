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
  },
  PUSH_ITEMS(state, items) {
    state.items.push(...items)
  }
}

export const actions = {
  FETCH({ commit }, params) {
    const query = this.$buildQuery(params)
    const url = `/api/albums?${query}`
    const { mode = 'set' } = params
    return this.$fetch(url).then(res => {
      if (mode === 'set') {
        commit('SET_ITEMS', res.items)
      } else if (mode === 'push') {
        commit('PUSH_ITEMS', res.items)
      }
      commit('SET_META', res.meta)
      return res
    })
  }
}
