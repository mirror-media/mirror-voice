export const state = () => ({
  showLightbox: false
})

export const mutations = {
  SET_SHOW_LIGHTBOX(state, value) {
    state.showLightbox = value
  }
}
