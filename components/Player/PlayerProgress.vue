<template>
  <div class="progress">
    <PlayerSlider
      :direction="'horizontal'"
      :buffered="internalBufferedAmount"
      :value.sync="internalPlayedAmount"
      @seek="onSeek"
    />
  </div>
</template>

<script>
import PlayerSlider from './PlayerSlider.vue'

export default {
  props: {
    bufferedAmount: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 100
      }
    },
    playedAmount: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 100
      }
    }
  },
  components: {
    PlayerSlider
  },
  watch: {
    bufferedAmount() {
      this.internalBufferedAmount = this.bufferedAmount / 100
    },
    playedAmount() {
      this.internalPlayedAmount = this.playedAmount / 100
    }
  },
  data() {
    return {
      internalBufferedAmount: this.bufferedAmount / 100,
      internalPlayedAmount: this.playedAmount / 100
    }
  },
  methods: {
    onSeek(value) {
      this.$emit('seek', value)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
