<template>
  <div class="player-wrapper">
    <Player
      class="player-wrapper__player"
      :is-playing.sync="$$isPlaying"
      :volume.sync="$$volume"
      :playback-rate.sync="$$playbackRate"
      :current-time.sync="$$currentTime"
      :update-time="updateTimeState"
      :audio-list="audioListState"
      :audio-current-index.sync="$$audioCurrentIndex"
      @durationchange="handleDurationChange"
      @error="handleError"
      @ended="handleEnded"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import Player from '~/components/Player/BasePlayer.vue'

export default {
  components: {
    Player
  },
  computed: {
    ...mapState({
      uuid: state => state.appPlayer.uuid,
      audioIsPlayingState: state => state.appPlayer.audioIsPlaying,
      audioVolumeState: state => state.appPlayer.audioVolume,
      audioPlaybackRateState: state => state.appPlayer.audioPlaybackRate,
      audioCurrentTimeState: state => state.appPlayer.audioCurrentTime,
      audioDurationState: state => state.appPlayer.audioDuration,
      updateTimeState: state => state.appPlayer.updateTime,
      audioListState: state => state.appPlayer.audioList,
      audioCurrentIndexState: state => state.appPlayer.audioCurrentIndex,
      audioCurrentAlbumId: state => state.appPlayer.audioCurrentAlbumId,
      payloadNextAudioList: state => state.appPlayer.payloadNextAudioList,
      payloadPrevAudioList: state => state.appPlayer.payloadPrevAudioList
    }),
    $$isPlaying: {
      get() {
        return (
          this.audioIsPlayingState &&
          this.$store.state.appPlayerCurrentPlaying.uuids[this.uuid] === true
        )
      },
      set(value) {
        this.SET_AUDIO_IS_PLAYING(value)
      }
    },
    $$volume: {
      get() {
        return this.audioVolumeState
      },
      set(value) {
        this.SET_AUDIO_VOLUME(value)
      }
    },
    $$playbackRate: {
      get() {
        return this.audioPlaybackRateState
      },
      set(value) {
        this.SET_AUDIO_PLAYBACK_RATE(value)
      }
    },
    $$currentTime: {
      get() {
        return this.audioCurrentTimeState
      },
      set(value) {
        this.SET_AUDIO_CURRENT_TIME(value)
      }
    },
    $$audioCurrentIndex: {
      get() {
        return this.audioCurrentIndexState
      },
      set(value) {
        this.SET_AUDIO_CURRENT_INDEX(value)
      }
    },

    ...mapGetters({
      currentSlug: 'appPlayer/currentSlug'
    })
  },
  watch: {
    currentSlug(newValue, oldValue) {
      const lastTrack = _.get(
        this.$store.state,
        ['localStorageTrackHistory', 'dict', oldValue],
        {}
      )
      const lastTrackCurrentTime = _.get(lastTrack, 'memorizedCurrentTime', 0)
      this.$sendGAAppPlayer({
        action: 'play_other',
        label: oldValue,
        value: lastTrackCurrentTime
      })
    },
    $$isPlaying(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.$sendGAAppPlayer({
          action: 'play_pause',
          label: this.currentSlug,
          value: this.audioCurrentTimeState
        })
      } else if (newValue && !oldValue) {
        this.$sendGAAppPlayer({
          action: 'play_continue',
          label: this.currentSlug,
          value: this.audioCurrentTimeState
        })
      }
    },
    $$audioCurrentIndex(value) {
      const payloadNextExist = this.payloadNextAudioList !== null
      const payloadPrevExist = this.payloadPrevAudioList !== null
      const shouldFetchNextPageAt = this.audioListState.length - 1
      const shouldFetchPrevPageAt = 0
      const shouldFetchNextPage = value >= shouldFetchNextPageAt
      const shouldFetchPrevPage = value <= shouldFetchPrevPageAt
      const albumId = this.audioCurrentAlbumId
      if (shouldFetchNextPage && payloadNextExist) {
        this.FETCH_SINGLES({
          payload: this.payloadNextAudioList,
          albumId,
          playAt: value,
          autoPlay: true,
          append: 'push'
        })
      } else if (shouldFetchPrevPage && payloadPrevExist) {
        this.FETCH_SINGLES({
          payload: this.payloadPrevAudioList,
          albumId,
          playAt: 10,
          autoPlay: true,
          append: 'unshift'
        })
      }
    },
    $$currentTime(value) {
      this.$store.commit('localStorageTrackHistory/MEMORIZE_TRACK', {
        track: this.audioListState[this.$$audioCurrentIndex],
        memorizedDate: new Date(),
        memorizedDuration: this.audioDurationState,
        memorizedCurrentTime: value
      })
    }
  },
  created() {
    this.$fetchSingle({
      max_results: 1,
      page: 1,
      sort: '-publishedDate',
      embedded: {
        albums: 1
      }
    }).then(({ items = [] }) => {
      const latestTrackInHistory = _.get(
        Object.values(this.$store.state.localStorageTrackHistory.dict).sort(
          (a, b) => new Date(b.memorizedDate) - new Date(a.memorizedDate)
        ),
        0,
        {}
      )
      if (!_.isEmpty(latestTrackInHistory)) {
        this.RESET_AUDIO_LIST({
          list: [latestTrackInHistory],
          updateTime: latestTrackInHistory.memorizedCurrentTime
        })
      } else {
        const singleItems = items.map(item => this.$normalizeSingle(item))
        this.RESET_AUDIO_LIST({ list: singleItems })
      }
    })

    window.addEventListener('beforeunload', () => {
      this.$store.commit('appPlayerCurrentPlaying/DELETE_UUID', this.uuid)
    })
  },
  methods: {
    ...mapMutations({
      SET_AUDIO_IS_PLAYING: 'appPlayer/SET_AUDIO_IS_PLAYING',
      SET_AUDIO_VOLUME: 'appPlayer/SET_AUDIO_VOLUME',
      SET_AUDIO_PLAYBACK_RATE: 'appPlayer/SET_AUDIO_PLAYBACK_RATE',
      SET_AUDIO_CURRENT_TIME: 'appPlayer/SET_AUDIO_CURRENT_TIME',
      SET_AUDIO_DURATION: 'appPlayer/SET_AUDIO_DURATION',
      SET_UPDATE_TIME: 'appPlayer/SET_UPDATE_TIME',
      SET_AUDIO_CURRENT_INDEX: 'appPlayer/SET_AUDIO_CURRENT_INDEX',
      SET_AUDIO_LIST: 'appPlayer/SET_AUDIO_LIST',
      PUSH_AUDIO_LIST: 'appPlayer/PUSH_AUDIO_LIST'
    }),
    ...mapActions({
      RESET_AUDIO_LIST: 'appPlayer/RESET_AUDIO_LIST',
      FETCH_SINGLES: 'appPlayer/FETCH_SINGLES'
    }),
    ...mapMutations({
      SET_SHOW_LIGHTBOX: 'lightboxPlayingError/SET_SHOW_LIGHTBOX'
    }),

    handleDurationChange(e) {
      this.SET_AUDIO_DURATION(e.target.duration)
    },
    handleError(e) {
      if (e.target.getAttribute('src') !== '') {
        this.SET_SHOW_LIGHTBOX(true)
      }
    },
    handleEnded() {
      this.$sendGAAppPlayer({
        action: 'play_end',
        label: this.currentSlug,
        value: this.audioCurrentTimeState
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.player-wrapper
  width 100vw
  height 60px
  background-color #313131
  display flex
  justify-content center
  align-items center
  z-index 1000

@media (max-width 768px)
  .player-wrapper
    background-color #191919
    padding 0 12px
</style>
