import _ from 'lodash'
import Vue from 'vue'

export const state = () => ({
  dict: {}
})

export const mutations = {
  MEMORIZE_TRACK(
    state,
    { track = {}, memorizedDate, memorizedDuration, memorizedCurrentTime }
  ) {
    if (!track.slug || track.slug === '') {
      throw new Error('please provide valid slug')
    }

    if (
      Object.keys(state.dict).length >=
      this.$LOCAL_STORAGE_HISTORY_LIMIT + 1
    ) {
      const oldestSlug = _.get(
        Object.values(state.dict).sort(
          (a, b) => new Date(a.memorizedDate) - new Date(b.memorizedDate)
        ),
        [0, 'slug'],
        ''
      )
      Vue.set(state, 'dict', _.omit(state.dict, oldestSlug))
    }

    Vue.set(state.dict, track.slug, {
      ...track,
      memorizedDate,
      memorizedDuration,
      memorizedCurrentTime
    })
  }
}
