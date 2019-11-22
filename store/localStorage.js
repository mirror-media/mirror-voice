export const state = () => ({
  lastTrackStorage: {},
  lastTrackPlayedTime: 0
})

export const mutations = {
  MEMORIZE_TRACK(state, sound) {
    const _sound = Object.assign({}, { fromLocalStorage: true }, sound)
    state.lastTrackStorage = _sound
  },
  MEMORIZE_TRACK_PLAYEDTIME(state, time) {
    state.lastTrackPlayedTime = time
  }
}
