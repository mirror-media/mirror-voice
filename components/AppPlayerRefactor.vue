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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import Player from '~/components/PlayerRefactor/BasePlayer.vue'

export default {
  components: {
    Player
  },
  computed: {
    ...mapState({
      audioIsPlayingState: state => state.appPlayerRefactor.audioIsPlaying,
      audioVolumeState: state => state.appPlayerRefactor.audioVolume,
      audioPlaybackRateState: state =>
        state.appPlayerRefactor.audioPlaybackRate,
      audioCurrentTimeState: state => state.appPlayerRefactor.audioCurrentTime,
      audioDurationState: state => state.appPlayerRefactor.audioDuration,
      updateTimeState: state => state.appPlayerRefactor.updateTime,
      audioListState: state => state.appPlayerRefactor.audioList,
      audioCurrentIndexState: state => state.appPlayerRefactor.audioCurrentIndex
    }),
    $$isPlaying: {
      get() {
        return this.audioIsPlayingState
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
      currentSlug: 'appPlayerRefactor/currentSlug'
    })
  },
  watch: {
    $$isPlaying(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.$sendGAAppPlayer({
          action: 'play_pause',
          label: this.currentSlug,
          value: this.audioCurrentTimeState
        })
      }
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
      const singleItems = items.map(item => this.$normalizeSingle(item))
      this.RESET_AUDIO_LIST({ list: singleItems })
    })
  },
  methods: {
    ...mapMutations({
      SET_AUDIO_IS_PLAYING: 'appPlayerRefactor/SET_AUDIO_IS_PLAYING',
      SET_AUDIO_VOLUME: 'appPlayerRefactor/SET_AUDIO_VOLUME',
      SET_AUDIO_PLAYBACK_RATE: 'appPlayerRefactor/SET_AUDIO_PLAYBACK_RATE',
      SET_AUDIO_CURRENT_TIME: 'appPlayerRefactor/SET_AUDIO_CURRENT_TIME',
      SET_AUDIO_DURATION: 'appPlayerRefactor/SET_AUDIO_DURATION',
      SET_UPDATE_TIME: 'appPlayerRefactor/SET_UPDATE_TIME',
      SET_AUDIO_CURRENT_INDEX: 'appPlayerRefactor/SET_AUDIO_CURRENT_INDEX',
      SET_AUDIO_LIST: 'appPlayerRefactor/SET_AUDIO_LIST',
      PUSH_AUDIO_LIST: 'appPlayerRefactor/PUSH_AUDIO_LIST'
    }),
    ...mapActions({
      RESET_AUDIO_LIST: 'appPlayerRefactor/RESET_AUDIO_LIST'
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
