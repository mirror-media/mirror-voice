import Vue from 'vue'
import _ from 'lodash'

// NOTE: we need to import utils manually because context is non-unaccessable in getters
import getSingleSoundSrc from '~/plugins/util/getSingleSoundSrc'
import getImgs from '~/plugins/util/getImgs'

export const state = () => ({
  showAppPlayer: true,
  isPlaying: false,
  pages: {},
  playingIndex: null,
  duration: 0,
  playedTime: 0,
  albumId: '',
  albumCover: ''
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

  SET_PLAYING_INDEX(state, value) {
    state.playingIndex = value
  },
  SET_ALBUM_ID(state, id) {
    Vue.set(state, 'albumId', id)
  },
  SET_ALBUM_COVER(state, url) {
    Vue.set(state, 'albumCover', url)
  },

  CLEAR_PAGES(state) {
    Vue.set(state, 'pages', {})
    state.playedTime = 0
  },
  INSERT_PAGE(state, { page, res }) {
    Vue.set(state.pages, page, res)
  },

  SET_IS_PLAYING(state, value) {
    state.isPlaying = value
  },

  SET_DUARTION(state, value) {
    state.duration = value
  },
  SET_PLAYED_TIME(state, value) {
    state.playedTime = value
  }
}

export const actions = {
  FETCH({ commit, dispatch, state }, params) {
    const albumId = _.get(params, ['where', 'albums', '$in', 0], '')
    const page = _.get(params, 'page', 1)

    if (state.albumId !== albumId) {
      commit('SET_ALBUM_ID', albumId)
      commit('CLEAR_PAGES')
    }
    commit('SET_PLAYING_INDEX', 0)

    return this.$fetchSingle(params).then(res => {
      dispatch('PREPARE_SINGLES', { page, res })
    })
  },
  PREPARE_SINGLES({ commit }, { page, res }) {
    commit('INSERT_PAGE', { page, res })
    commit('SHOW_APP_PLAYER')
  }
}

export const getters = {
  LIST(state) {
    const { pages } = state

    // Object with all keys sorted
    const sortedObject = _.fromPairs(_.sortBy(_.toPairs(pages), () => 0))

    const singlesData = _.flatten(
      Object.values(sortedObject).map(page => page.items)
    )
    return singlesData.map(sound => ({
      cover:
        sound.cover ||
        _.get(getImgs(sound), ['mobile', 'url'], state.albumCover),
      title: _.get(sound, 'title', ''),
      src: sound.src || getSingleSoundSrc(sound),
      slug: _.get(sound, 'slug', ''),
      vocals: _.get(sound, 'vocals')
    }))
  }
}
