import Vue from 'vue'
import _ from 'lodash'

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
  list: [],
  meta: {
    maxResults: 0,
    total: 0,
    page: 0
  },
  links: {},
  playingIndex: 0,
  albumId: ''
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
  },
  SET_PLAYING_INDEX(state, value) {
    state.playingIndex = value
  },
  SET_ALBUM_ID(state, id) {
    Vue.set(state, 'albumId', id)
  },

  SET_META(state, meta) {
    Vue.set(state, 'meta', meta)
  },
  PUSH_ITEMS(state, items) {
    state.list.push(...items)
  },
  UNSHIFT_ITEMS(state, items) {
    state.list.unshift(...items)
  },

  SET_LINKS(state, links) {
    Vue.set(state, 'links', links)
  }
}

export const actions = {
  FETCH({ dispatch }, params) {
    const albumId = _.get(params, ['where', 'albums', '$in', 0], '')
    const page = _.get(params, 'page', 1)

    const query = this.$buildQuery(params)
    const url = `/api/listing?${query}`
    const { mode = 'set' } = params
    return this.$fetch(url).then(res => {
      if (res.items.length > 0) {
        dispatch('PLAY', {
          mode,
          sounds: res.items,
          meta: res.meta,
          links: res.links,
          albumId,
          page
        })
      }
      return res
    })
  },
  PLAY(
    { commit, state },
    {
      mode = 'set',
      sounds,
      meta = { maxResults: 0, total: 0, page: 0 },
      links = {},
      albumId,
      page = 0
    }
  ) {
    sounds = sounds.map(sound => ({
      title: sound.title,
      src: `http://www.mirrormedia.mg/assets/audios/${sound.id}.wav`,
      slug: sound.name
    }))
    if (mode === 'set') {
      commit('SET_LIST', sounds)
    } else if (mode === 'push') {
      commit('PUSH_ITEMS', sounds)
    } else if (mode === 'unshift') {
      commit('UNSHIFT_ITEMS', sounds)
    }
    commit('SET_ALBUM_ID', albumId)
    commit('SET_META', meta)
    commit('SET_LINKS', links)

    commit('SHOW_APP_PLAYER')
  }
}
