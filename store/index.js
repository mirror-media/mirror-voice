export const state = () => ({
  sections: []
})

export const mutations = {
  SET_SECTIONS(state, items) {
    state.sections = items
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const { items } = await app.$fetchSections({
      sort: 'sortOrder',
      max_results: 20
    })
    commit('SET_SECTIONS', items)
  }
}
