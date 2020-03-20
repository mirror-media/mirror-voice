<template>
  <div class="player">
    <audio
      ref="audio"
      :src="audioCurrentAudioSrc"
    />
    <BasePlayerCover
      class="player__cover cover"
      :to="audioCurrentRoutePath"
      :img-src="audioCurrentCoverImgSrc"
    />
    <BasePlayerNavs
      class="player__navs"
      :is-playing.sync="$$isPlaying"
      :show-tracks-nav="showTracksNav"
      @rewind="handleRewind"
      @fastforward="handleFastforward"
      @backward="handleBackward"
      @forward="handleForward"
    />
    <div class="player__middle middle">
      <BasePlayerInfo
        :to="audioCurrentRoutePath"
        :text="audioCurrentTitle"
        :time-current="$$currentTime"
        :time-total="audioElementDuration"
      />
      <div class="middle__progress-rewind-fastword-wrapper">
        <BasePlayerSlider
          class="middle__progress"
          :direction="'horizontal'"
          :value-current.sync="sliderProgressCurrentTime"
          :value-buffered="sliderProgressBuffered"
        />
        <div class="mobile-rewind-fastforward-wrapper">
          <button
            class="button rewind-button"
            @click="handleRewind"
          >
            <img
              class="rewind-button__img"
              src="~/assets/img/skip15secback.svg"
              alt="rewind"
            >
          </button>
          <button
            class="button fastforward-button"
            @click="handleFastforward"
          >
            <img
              class="fastforward-button__img"
              src="~/assets/img/skip15sec.svg"
              alt="fastforward"
            >
          </button>
        </div>
      </div>
    </div>
    <BasePlayerRate
      class="player__rate"
      :playback-rate-current.sync="$$playbackRate"
    />
    <BasePlayerVolume
      class="player__volume"
      :volume-current.sync="$$volume"
    />
  </div>
</template>

<script>
import _ from 'lodash'

import BasePlayerVolume from './BasePlayerVolume.vue'
import BasePlayerRate from './BasePlayerRate.vue'
import BasePlayerSlider from './BasePlayerSlider.vue'
import BasePlayerInfo from './BasePlayerInfo.vue'
import BasePlayerNavs from './BasePlayerNavs.vue'
import BasePlayerCover from './BasePlayerCover.vue'

import { ratesAvailable } from './comm/rate'

import audioEventEmitter from './mixins/audioEventEmitter'

export default {
  components: {
    BasePlayerVolume,
    BasePlayerRate,
    BasePlayerSlider,
    BasePlayerInfo,
    BasePlayerNavs,
    BasePlayerCover
  },
  mixins: [audioEventEmitter],
  props: {
    audioList: {
      type: Array,
      default: () => []
    },
    audioCurrentIndex: {
      type: Number,
      default: 0
    },

    isPlaying: {
      type: Boolean,
      default: false
    },

    volume: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    playbackRate: {
      type: Number,
      required: true,
      validator(value) {
        return ratesAvailable.includes(value)
      }
    },
    currentTime: {
      type: Number,
      required: true
    },
    updateTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      audioElementDuration: 0,
      audioElementBuffered: 0
    }
  },
  computed: {
    audioElement() {
      return this.$refs.audio
    },

    $$audioCurrentIndex: {
      get() {
        return this.audioCurrentIndex
      },
      set(val) {
        if (val >= 0 && val <= this.audioList.length - 1) {
          this.$emit('update:audioCurrentIndex', val)
          this.$nextTick(() => {
            this.audioElement.play()
          })
        }
      }
    },
    audioCurrent() {
      return this.audioList[this.$$audioCurrentIndex]
    },
    audioCurrentTitle() {
      return _.get(this.audioCurrent, 'title', '')
    },
    audioCurrentSlug() {
      return _.get(this.audioCurrent, 'slug', '')
    },
    audioCurrentRoutePath() {
      const slugInvalid = !this.audioCurrentSlug || this.audioCurrentSlug === ''
      if (slugInvalid) {
        return '/'
      }
      return `/single/${this.audioCurrentSlug}`
    },
    audioCurrentAudioSrc() {
      return _.get(this.audioCurrent, 'audioSrc', '')
    },
    audioCurrentCoverImgSrc() {
      return _.get(this.audioCurrent, 'coverImgSrc', '')
    },
    showTracksNav() {
      return this.audioList.length > 1
    },

    $$volume: {
      get() {
        return this.volume
      },
      set(value) {
        this.audioElement.volume = value
      }
    },
    $$playbackRate: {
      get() {
        return this.playbackRate
      },
      set(value) {
        this.audioElement.playbackRate = value
      }
    },
    $$currentTime: {
      get() {
        return this.currentTime
      },
      set(value) {
        this.audioElement.currentTime = value
      }
    },
    sliderProgressCurrentTime: {
      get() {
        if (!this.audioElementDuration) {
          return 0
        }
        return this.$$currentTime / this.audioElementDuration
      },
      set(value) {
        this.audioElement.currentTime = this.audioElementDuration * value
      }
    },
    sliderProgressBuffered() {
      if (!this.audioElementDuration) {
        return 0
      }
      return this.audioElementBuffered / this.audioElementDuration
    },

    $$isPlaying: {
      get() {
        return this.isPlaying
      },
      set(value) {
        if (value) {
          this.handlePlay()
        } else {
          this.handlePause()
        }
      }
    }
  },
  watch: {
    volume(value) {
      this.audioElement.volume = value
    },
    playbackRate(value) {
      this.audioElement.playbackRate = value
    },
    updateTime(value) {
      this.$nextTick(() => {
        this.audioElement.currentTime = value
      })
    },
    isPlaying(value) {
      if (value) {
        this.audioElement.play()
      } else {
        this.audioElement.pause()
      }
    }
  },
  mounted() {
    this.initAudio()
    this.audioElement.addEventListener('volumechange', this.handleVolumechange)
    this.audioElement.addEventListener('ratechange', this.handleRateChange)
    this.audioElement.addEventListener('timeupdate', this.handleTimeupdate)
    this.audioElement.addEventListener(
      'durationchange',
      this.handleDurationchange
    )
    this.audioElement.addEventListener('progress', this.handleBuffered)
    this.audioElement.addEventListener('timeupdate', this.handleBuffered)
    this.audioElement.addEventListener('loadedmetadata', this.handleBuffered)
    this.audioElement.addEventListener('play', this.handlePlay)
    this.audioElement.addEventListener('pause', this.handlePause)
    this.audioElement.addEventListener('ended', this.handleEnded)
    this.audioElement.addEventListener('canplay', this.handleCanplay)
  },
  destroyed() {
    this.audioElement.removeEventListener(
      'volumechange',
      this.handleVolumechange
    )
    this.audioElement.removeEventListener('ratechange', this.handleRateChange)
    this.audioElement.removeEventListener('timeupdate', this.handleTimeupdate)
    this.audioElement.removeEventListener(
      'durationchange',
      this.handleDurationchange
    )
    this.audioElement.removeEventListener('progress', this.handleBuffered)
    this.audioElement.removeEventListener('timeupdate', this.handleBuffered)
    this.audioElement.removeEventListener('loadedmetadata', this.handleBuffered)
    this.audioElement.removeEventListener('play', this.handlePlay)
    this.audioElement.removeEventListener('pause', this.handlePause)
    this.audioElement.removeEventListener('ended', this.handleEnded)
    this.audioElement.removeEventListener('canplay', this.handleCanplay)
  },
  methods: {
    initAudio() {
      this.audioElement.volume = this.volume
      this.audioElement.playbackRate = this.playbackRate
      this.audioElement.currentTime = this.currentTime
    },
    handleVolumechange(e) {
      this.$emit('update:volume', e.target.volume)
    },
    handleRateChange(e) {
      this.$emit('update:playbackRate', e.target.playbackRate)
    },
    handleTimeupdate(e) {
      this.$emit('update:currentTime', e.target.currentTime)
    },
    handleDurationchange(e) {
      this.audioElementDuration = e.target.duration
    },
    handleBuffered(e) {
      if (e.target.buffered.length) {
        this.audioElementBuffered = e.target.buffered.end(
          e.target.buffered.length - 1
        )
      }
    },
    handlePlay() {
      this.$emit('update:isPlaying', true)
    },
    handlePause() {
      this.$emit('update:isPlaying', false)
    },
    handleEnded() {
      this.$$audioCurrentIndex += 1
    },
    handleCanplay() {
      if (this.isPlaying) {
        this.audioElement.play()
      }
    },

    handleRewind() {
      this.$$currentTime -= 15
    },
    handleFastforward() {
      this.$$currentTime += 15
    },
    handleBackward() {
      this.$$audioCurrentIndex -= 1
    },
    handleForward() {
      this.$$audioCurrentIndex += 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.player
  display flex
  align-items center
  height 60px
  max-width 1000px
  &__cover
    margin 0 31px 0 0
  &__middle
    margin 0 0 0 25px
  &__rate
    margin 0 0 0 20px
  &__volume
    margin 0 0 0 28px

.cover
  d = 34px
  width d
  height d
  &__img
    width 100%
    height 100%
    object-fit cover

.middle
  display flex
  flex-direction column
  width 700px
  &__progress
    margin 10px 0 0 0

.mobile-rewind-fastforward-wrapper
  display none

@media (max-width 768px)
  .player
    max-width 100vw
    width 100vw
    &__cover
      display none
    &__middle
      order 1
      margin 0 0 0 10px
    &__rate
      order 0
    &__volume
      display none !important

  .middle
    display flex
    flex-direction column
    width 0px
    flex 1 1 auto
    &__progress-rewind-fastword-wrapper
      display flex
      justify-content space-between
      margin 4px 0 0 0
    &__progress
      flex 1 1 auto

  .mobile-rewind-fastforward-wrapper
    display flex
    margin 0 0 0 8px

  .button
    padding 0
    background-color transparent
    border none
    outline none
  .rewind-button
    height 20px
    &__img
      height 100%
  .fastforward-button
    height 20px
    margin 0 0 0 8px
    &__img
      height 100%
</style>
