import _ from 'lodash'

export const state = () => ({
  lastTrackStorage: {},
  lastTrackPlayedTime: 0,
  lastTrackDurationTime: 0
})

export const actions = {
  MEMORIZE_TRACK({ commit, state }, sound) {
    const isSameTrack =
      _.get(sound, 'slug', '') ===
      _.get(state, ['lastTrackStorage', 'slug'], '')
    if (_.isEmpty(sound) || isSameTrack) {
      return
    }
    commit('MEMORIZE_TRACK', sound)
    const track = Object.assign(
      {},
      { lastTrackStorage: state.lastTrackStorage }
    )
    commit('localStorageTrackHistory/MEMORIZE_TRACK', track, { root: true })
  },
  MEMORIZE_TRACK_PLAYEDTIME({ commit, state }, time) {
    commit('MEMORIZE_TRACK_PLAYEDTIME', time)
    commit(
      'localStorageTrackHistory/MEMORIZE_TRACK_PLAYEDTIME',
      { track: state.lastTrackStorage, time },
      { root: true }
    )
  },
  MEMORIZE_TRACK_DURATIONTIME({ commit, state }, time) {
    commit('MEMORIZE_TRACK_DURATIONTIME', time)
    commit(
      'localStorageTrackHistory/MEMORIZE_TRACK_DURATIONTIME',
      { track: state.lastTrackStorage, time },
      { root: true }
    )
  }
}

export const mutations = {
  MEMORIZE_TRACK(state, sound) {
    const _sound = Object.assign({}, { fromLocalStorage: true }, sound)
    state.lastTrackStorage = _sound
  },
  MEMORIZE_TRACK_PLAYEDTIME(state, time) {
    state.lastTrackPlayedTime = time
  },
  MEMORIZE_TRACK_DURATIONTIME(state, time) {
    state.lastTrackDurationTime = time
  }
}
