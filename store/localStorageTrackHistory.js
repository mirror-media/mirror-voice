import _ from 'lodash'
import Vue from 'vue'

const findTrack = (state, track) =>
  _.find(state.trackHistory, history => {
    return history.lastTrackStorage.slug === track.slug
  })

const findTrackIndex = (state, track) =>
  _.findIndex(state.trackHistory, history => {
    return history.lastTrackStorage.slug === track.slug
  })

const move = (array, fromIndex, toIndex) =>
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])

export const state = () => ({
  trackHistory: []
})

export const mutations = {
  MEMORIZE_TRACK(state, track) {
    const trackInStorage = findTrack(state, track.lastTrackStorage)
    if (trackInStorage) {
      const trackIndex = findTrackIndex(state, track.lastTrackStorage)
      trackInStorage.lastTrackStorage.memorizedDate = _.get(
        track,
        ['lastTrackStorage', 'memorizedDate'],
        ''
      )
      move(state.trackHistory, trackIndex, state.trackHistory.length - 1)
    } else {
      const isReachHistoryLimit =
        state.trackHistory.length >= this.$LOCAL_STORAGE_HISTORY_LIMIT
      if (isReachHistoryLimit) {
        state.trackHistory.shift()
      }
      state.trackHistory.push(track)
    }
  },
  MEMORIZE_TRACK_PLAYEDTIME(state, { track, time }) {
    const trackShouldUpdate = findTrack(state, track)
    if (!trackShouldUpdate) {
      return
    }
    Vue.set(trackShouldUpdate, 'lastTrackPlayedTime', time)
  },
  MEMORIZE_TRACK_DURATIONTIME(state, { track, time }) {
    const trackShouldUpdate = findTrack(state, track)
    if (!trackShouldUpdate) {
      return
    }
    trackShouldUpdate.lastTrackDurationTime = time
  }
}
