<template>
  <div :class="[ 'player', `player--${type}` ]">
    <audio ref="audio" />
    <div v-if="type === 'long'" class="player__cover cover">
      <img class="cover__img" src alt>
    </div>
    <PlayerNavs
      class="player__navs"
      :show-nav="type === 'long'"
      :is-playing="isPlaying"
      @backward="''"
      @pause="pause"
      @play="play"
      @forward="''"
    />
    <div :class="[ 'player__middle', 'middle', `middle--${type}` ]">
      <PlayerInfo
        class="middle__info"
        :sound="soundCurrent"
        :show-title="type === 'long'"
        :duration="playStatDuration"
        :played="playStatPlayedTime"
      />
      <PlayerProgress
        class="middle__progress"
        :buffered-amount="((playStatLoadedTime / playStatDuration) * 100) || 0"
        :played-amount="((playStatPlayedTime / playStatDuration) * 100) || 0"
        @seek="seek"
      />
    </div>
    <PlayerRate class="player__rate" :type="type" :rate-current.sync="audioPlaybackRate" />
    <PlayerVolume
      v-if="type === 'long'"
      class="player__volume"
      :type="type"
      :volume.sync="audioVolume"
    />
  </div>
</template>

<script>
import PlayerNavs from './PlayerNavs.vue'
import PlayerInfo from './PlayerInfo.vue'
import PlayerProgress from './PlayerProgress.vue'
import PlayerRate from './PlayerRate.vue'
import PlayerVolume from './PlayerVolume.vue'

import initEventEmitters from './util/eventEmitters'
import initEventHandlers from './util/eventHandlers'

import { rateAvailable } from './comm/rate'

export default {
  components: {
    PlayerNavs,
    PlayerInfo,
    PlayerProgress,
    PlayerRate,
    PlayerVolume
  },
  props: {
    type: {
      type: String,
      default: 'short',
      validator(value) {
        return ['short', 'long'].includes(value)
      }
    },
    sound: {
      type: Object,
      required: true,
      validator(sound) {
        return !!sound.src
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },

    // native audio's properties as props
    volume: {
      type: Number,
      default: 1,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    muted: {
      type: Boolean,
      default: false
    },
    playbackRate: {
      type: Number,
      default: 1.0,
      validator(value) {
        return rateAvailable.includes(value)
      }
    }
  },
  data() {
    return {
      internalSound: this.sound,
      internalVolume: this.volume,
      internalMuted: this.muted,
      internalPlaybackRate: this.playbackRate,
      internalBufferedAmount: 0,
      internalPlayedAmount: 0,
      isPlaying: false,
      isLoading: false,
      playStatDuration: 0,
      playStatLoadedTime: 0,
      playStatPlayedTime: 0
    }
  },
  computed: {
    // alias of audio element
    audio() {
      return this.$refs.audio
    },

    // observers
    // inform parent component in setters
    soundCurrent: {
      get() {
        return this.internalSound
      },
      set(val) {
        this.$emit('update:sound', val)
        this.internalSound = val
      }
    },
    audioVolume: {
      get() {
        return this.internalVolume
      },
      set(val) {
        this.$emit('update:volume', val)
        this.internalVolume = val
      }
    },
    isAudioMuted: {
      get() {
        return this.internalMuted
      },
      set(val) {
        this.$emit('update:muted', val)
        this.internalMuted = val
      }
    },
    audioPlaybackRate: {
      get() {
        return this.internalPlaybackRate
      },
      set(val) {
        this.$emit('update:playbackRate', val)
        this.internalPlaybackRate = val
      }
    }
  },
  watch: {
    // observe mutable properties
    audioVolume() {
      this.audio.volume = this.audioVolume
    },
    isAudioMuted() {
      this.audio.muted = this.isAudioMuted
    },
    audioPlaybackRate() {
      this.audio.playbackRate = this.audioPlaybackRate
    },

    // sync muted, volume if parent component mutate the props
    volume() {
      this.internalVolume = this.volume
    },
    muted() {
      this.internalMuted = this.muted
    },
    playbackRate() {
      this.internalPlaybackRate = this.playbackRate
    },

    // coordinate volume and muted
    internalVolume() {
      this.internalMuted = this.internalVolume <= 0
    },
    internalMuted() {
      this.internalVolume = this.internalMuted ? 0 : this.volume
    }
  },
  mounted() {
    this.initAudio()
  },
  methods: {
    initAudio() {
      // set exposed properties as their init value which is passing from props
      this.audio.volume = this.volume
      this.audio.muted = this.muted
      this.audio.playbackRate = this.playbackRate

      // init events
      initEventEmitters(this)
      initEventHandlers(this)

      // set audio's src
      if (this.soundCurrent) {
        this.audio.src = this.soundCurrent.src
      }
    },
    play() {
      this.audio.play()
    },
    pause() {
      this.audio.pause()
    },
    seek(value) {
      this.audio.currentTime = this.audio.duration * value
    }
  }
}
</script>

<style lang="stylus" scoped>
.player
  display flex
  align-items center
  height 60px
  background-color #313131
  &--short
    padding 16px 15px 16px 23px
    max-width 724px
  &--long
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
  background-color black
  // &__img

.middle
  display flex
  flex-direction column
  &--short
    width 566px
  &--long
    width 700px
  &__progress
    margin 10px 0 0 0
</style>
