export const state = () => ({
  showAppPlayer: false
})

export const mutations = {
  TOGGLE_APP_PLAYER(state) {
    state.showAppPlayer = !state.showAppPlayer
  }
}
