import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'

export const state = () => ({
  uuid: uuidv4(),
  audioIsPlaying: false,
  audioVolume: 1,
  audioPlaybackRate: 1,
  audioCurrentTime: 0,
  audioDuration: 0,
  updateTime: 0,
  audioList: [],
  payloadPrevAudioList: null,
  payloadNextAudioList: null,
  audioCurrentIndex: -1,

  audioCurrentAlbumId: null
})

export const mutations = {
  SET_AUDIO_IS_PLAYING(state, value) {
    /*
    ** Toggle playing state in appPlayerCurrentPlaying store
    ** in order to allow only one player playing simultaneously
    ** should move these code to appPlayerCurrentPlaying.js
    ** and refactor SET_AUDIO_IS_PLAYING to actions in the future
    */
    const currentPlayings = this.state.appPlayerCurrentPlaying.uuids
    if (value) {
      Object.keys(currentPlayings).forEach(key => {
        if (key !== state.uuid) {
          Vue.set(currentPlayings, key, false)
        }
      })
    }
    Vue.set(currentPlayings, state.uuid, value)

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
    state.audioCurrentAlbumId = value
  },
  SET_AUDIO_LIST(state, list) {
    state.audioList = list
  },
  PUSH_AUDIO_LIST(state, list) {
    state.audioList.push(...list)
  },
  UNSHIFT_AUDIO_LIST(state, list) {
    state.audioList.unshift(...list)
  },
  SET_FETCH_PAYLOAD(state, { where = 'prev', payload }) {
    if (where === 'prev') {
      state.payloadPrevAudioList = payload
    } else if (where === 'next') {
      state.payloadNextAudioList = payload
    }
  }
}

export const actions = {
  RESET_AUDIO_LIST(
    { commit },
    {
      list = [],
      links = {},
      albumId = null,
      playAt = 0,
      updateTime = 0,
      autoPlay = false,
      append = null
    } = {}
  ) {
    if (!append) {
      commit('SET_AUDIO_LIST', list)
    } else if (append === 'push') {
      commit('PUSH_AUDIO_LIST', list)
    } else if (append === 'unshift') {
      commit('UNSHIFT_AUDIO_LIST', list)
    }

    const hrefPrev = _.get(links, ['prev', 'href'], '')
    const hrefNext = _.get(links, ['next', 'href'], '')
    const payloadPrev =
      hrefPrev !== ''
        ? this.$toPayloadObject({
            maxResults: 10,
            payloadString: hrefPrev.replace('posts', '')
          })
        : null
    const payloadNext =
      hrefNext !== ''
        ? this.$toPayloadObject({
            maxResults: 10,
            payloadString: hrefNext.replace('posts', '')
          })
        : null

    commit('SET_FETCH_PAYLOAD', {
      where: 'prev',
      payload: payloadPrev
    })
    commit('SET_FETCH_PAYLOAD', {
      where: 'next',
      payload: payloadNext
    })

    commit('SET_UPDATE_TIME', updateTime)
    commit('SET_AUDIO_CURRENT_INDEX', playAt)
    commit('SET_AUDIO_IS_PLAYING', autoPlay)
    commit('SET_ALBUM_ID', albumId)
  },
  async FETCH_SINGLES(
    { dispatch },
    {
      payload = {},
      albumId = null,
      playAt = 0,
      autoPlay = false,
      append = null
    } = {}
  ) {
    const { items = [], links = {} } = await this.$fetchSingle(
      _.cloneDeep(payload)
    )
    dispatch('RESET_AUDIO_LIST', {
      list: items.map(item => this.$normalizeSingle(item)),
      links,
      albumId,
      playAt,
      autoPlay,
      append
    })
  }
}

export const getters = {
  currentSlug(state) {
    return _.get(state.audioList, [state.audioCurrentIndex, 'slug'], '')
  }
}
