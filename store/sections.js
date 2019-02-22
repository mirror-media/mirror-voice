import Vue from 'vue'
import _ from 'lodash'

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
  FETCH({ commit }, params) {
    const query = this.$buildQuery(params)
    const url = `/api/sections?${query}`
    return this.$fetch(url).then(res => {
      commit('SET_ITEMS', res.items)
      commit('SET_META', res.meta)
      return res
    })
  }
}

export const getters = {
  AUDIO_SECTIONS(state) {
    return state.items.filter(item =>
      ['audioSection1', 'audioSection2'].includes(item.name)
    )
  },
  AUDIO_SECTIONS_CATEGORIES(state, getters) {
    const categories = getters.AUDIO_SECTIONS.map(section => {
      return section.categories.map(category =>
        Object.assign(category, { section: section.name })
      )
    })

    return _.flatten(categories)
  }
}
