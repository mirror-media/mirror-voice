import _ from 'lodash'
import Vue from 'vue'

export const state = () => ({
  uuids: {}
})

export const mutations = {
  DELETE_UUID(state, uuid) {
    Vue.set(state, 'uuids', _.omit(state.uuids, uuid))
  }
}
