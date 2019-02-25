import Vue from 'vue'

export const state = () => ({
  showAppPlayer: false,

  /*
  ** sound template:
  ** {
  **   title: 'sound's title,
  **   src: 'sound's src,
  **   slug: 'sound's slug
  ** }
  */
  list: []
})

export const mutations = {
  TOGGLE_APP_PLAYER(state) {
    state.showAppPlayer = !state.showAppPlayer
  },
  SHOW_APP_PLAYER(state) {
    state.showAppPlayer = true
  },
  HIDE_APP_PLAYER(state) {
    state.showAppPlayer = false
  },

  SET_LIST(state, list) {
    Vue.set(state, 'list', list)
  }
}

export const actions = {
  FETCH({ dispatch }, params) {
    const query = this.$buildQuery(params)
    const url = `/api/listing?${query}`
    return this.$fetch(url).then(res => {
      if (res.items.length > 0) {
        dispatch('PLAY', res.items)
      }
      return res
    })
  },
  PLAY({ commit }, sounds) {
    sounds = sounds.map(sound => ({
      title: sound.title,
      src: `http://www.mirrormedia.mg/assets/audios/${sound.id}.wav`,
      slug: sound.name
    }))
    commit('SET_LIST', sounds)
    commit('SHOW_APP_PLAYER')
  }
}
