import _ from 'lodash'

export const state = () => ({
  audioIsPlaying: false,
  audioVolume: 1,
  audioPlaybackRate: 1,
  audioCurrentTime: 0,
  audioDuration: 0,
  updateTime: 0,
  audioList: [],
  audioCurrentIndex: 0,

  playerCurrentAlbumId: null
})

export const mutations = {
  SET_AUDIO_IS_PLAYING(state, value) {
    state.audioIsPlaying = value
  },
  SET_AUDIO_VOLUME(state, value) {
    state.audioVolume = value
  },
  SET_AUDIO_PLAYBACK_RATE(state, value) {
    state.audioPlaybackRate = value
  },
  SET_AUDIO_CURRENT_TIME(state, value) {
    state.audioCurrentTime = value
  },
  SET_AUDIO_DURATION(state, value) {
    state.audioDuration = value
  },
  SET_UPDATE_TIME(state, value) {
    state.updateTime = value
  },
  SET_AUDIO_CURRENT_INDEX(state, value) {
    state.audioCurrentIndex = value
  },
  SET_ALBUM_ID(state, value) {
    state.playerCurrentAlbumId = value
  },
  SET_AUDIO_LIST(state, list) {
    state.audioList = list
  },
  PUSH_AUDIO_LIST(state, list) {
    state.audioList.push(...list)
  }
}

export const actions = {
  RESET_AUDIO_LIST(
    { commit },
    { list = [], albumId = null, autoPlay = false }
  ) {
    commit('SET_AUDIO_LIST', list)
    commit('SET_AUDIO_CURRENT_INDEX', 0)
    commit('SET_UPDATE_TIME', 0)
    commit('SET_AUDIO_IS_PLAYING', autoPlay)
    commit('SET_ALBUM_ID', albumId)
  },
  async FETCH_SINGLES(
    { dispatch },
    { payload = {}, albumId = null, autoPlay = false }
  ) {
    const { items = [] } = await this.$fetchSingle(payload)
    dispatch('RESET_AUDIO_LIST', {
      list: items.map(item => this.$normalizeSingle(item)),
      albumId,
      autoPlay
    })
  }
}

export const getters = {
  currentSlug(state) {
    return _.get(state.audioList, [state.audioCurrentIndex, 'slug'], '')
  }
}
