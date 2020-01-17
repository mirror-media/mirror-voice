import _ from 'lodash'

export const state = () => ({
  sections: [],
  categories: []
})

export const mutations = {
  SET_SECTIONS(state, items) {
    state.sections = items
  },
  SET_CATEGORIES(state, items) {
    state.categories = items
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const { items } = await app.$fetchSections({
      sort: 'sortOrder',
      max_results: 20,
      where: {
        name: {
          $in: [app.$VOICE_SECTION_NAME]
        }
      }
    })
    commit('SET_SECTIONS', items)

    const categories = _.uniqBy(_.flatten(_.map(items, 'categories')), 'id')
    commit('SET_CATEGORIES', categories)
  }
}
