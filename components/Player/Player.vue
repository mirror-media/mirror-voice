<template>
  <div :class="[ 'player', `player--${type}` ]">
    <audio ref="audio"></audio>
    <div
      v-if="type === 'long'"
      class="player__cover cover"
    >
      <img class="cover__img" src="" alt="">
    </div>
    <PlayerNavs
      class="player__navs"
      :showNav="type === 'long'"
      :isPlaying="isPlaying"
      @backward="''"
      @pause="pause"
      @play="play"
      @forward="''"
    />
    <div :class="[ 'player__middle', 'middle', `middle--${type}` ]">
      <PlayerInfo
        class="middle__info"
        :sound="soundCurrent"
        :showTitle="type === 'long'"
        :duration="playStatDuration"
        :played="playStatPlayedTime"
      />
      <PlayerProgress
        class="middle__progress"
        :bufferedAmount="(playStatLoadedTime / playStatDuration) * 100"
        :playedAmount="(playStatPlayedTime / playStatDuration) * 100"
      />
    </div>
    <PlayerRate
      class="player__rate"
      :type="type"
      :rateCurrent.sync="audioPlaybackRate"
    />
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
    volume: {
      type: Number,
      default: 0.8,
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
  components: {
    PlayerNavs,
    PlayerInfo,
    PlayerProgress,
    PlayerRate,
    PlayerVolume
  },
  watch: {
    audioPlaybackRate() {
      this.audio.playbackRate = this.audioPlaybackRate
    }
  },
  data() {
    return {
      InternalSound: this.sound,
      InternalVolume: this.volume,
      InternalMuted: this.muted,
      InternalPlaybackRate: this.playbackRate,
      isPlaying: false,
      isLoading: false,
      playStatDuration: 0,
      playStatLoadedTime: 0,
      playStatPlayedTime: 0
    }
  },
  computed: {
    audio() {
      return this.$refs.audio
    },
    soundCurrent: {
      get() {
        return this.InternalSound
      },
      set(val) {
        // canUseSync && this.$emit('update:music', val)
        this.InternalSound = val
      }
    },
    audioVolume: {
      get() {
        return this.InternalVolume
      },
      set(val) {
        // canUseSync && this.$emit('update:volume', val)
        this.InternalVolume = val
      }
    },
    isAudioMuted: {
      get() {
        return this.InternalMuted
      },
      set(val) {
        // canUseSync && this.$emit('update:muted', val)
        this.InternalMuted = val
      }
    },
    audioPlaybackRate: {
      get() {
        return this.InternalPlaybackRate
      },
      set(val) {
        // canUseSync && this.$emit('update:muted', val)
        this.InternalPlaybackRate = val
      }
    }
  },
  methods: {
    initAudio() {
      initEventEmitters(this)
      initEventHandlers(this)

      if (this.soundCurrent) {
        this.audio.src = this.soundCurrent.src
      }
    },
    play() {
      this.audio.play()
    },
    pause() {
      this.audio.pause()
    }
  },
  mounted() {
    this.initAudio()
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
