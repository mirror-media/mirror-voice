import _ from 'lodash'

export const state = () => ({
  crumbs: [{ title: '首頁', path: '/' }]
})

export const mutations = {
  PUSH(state, crumbs) {
    state.crumbs = _.take(state.crumbs)
    state.crumbs.push(...crumbs)
  }
}
