<template>
  <div
    v-click-outside="hideSlider"
    class="volume"
  >
    <button
      :class="[
        'button-toggler',
        { 'mute': shouldMute }
      ]"
    >
      <img
        v-show="shouldMute"
        class="button-toggler__img"
        src="~/assets/img/btn_volume_min.png"
        alt="volume min"
        @click="toggleSlider"
      >
      <img
        v-show="!shouldMute"
        class="button-toggler__img"
        src="~/assets/img/btn_volume_normal.png"
        alt="volume normal"
        @click="toggleSlider"
      >
    </button>
    <div
      v-show="showSlider"
      class="volume__slider slider"
    >
      <BasePlayerSlider
        :direction="'vertical'"
        :value-current.sync="volume"
      />
    </div>
  </div>
</template>

<script>
import BasePlayerSlider from './BasePlayerSlider.vue'

export default {
  components: {
    BasePlayerSlider
  },
  props: {
    volumeCurrent: {
      type: Number,
      default: 1,
      validator(value) {
        return value >= 0 && value <= 1
      }
    }
  },
  data() {
    return {
      showSlider: false
    }
  },
  computed: {
    volume: {
      get() {
        return this.volumeCurrent
      },
      set(value) {
        this.$emit('update:volumeCurrent', value)
      }
    },
    shouldMute() {
      return this.volume <= 0
    }
  },
  methods: {
    toggleSlider() {
      this.showSlider = !this.showSlider
    },
    hideSlider() {
      this.showSlider = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.volume
  height 100%
  display flex
  justify-content center
  align-items center
  position relative
  &__slider
    position absolute
    bottom calc(100% + 3px)
    width 52px
    height 164px
    background-color #313131
    border-radius 2px

.button-toggler
  height 18px
  cursor pointer
  padding 0
  background-color transparent
  border none
  outline none
  &__img
    height 100%

.slider
  display flex
  justify-content center
  align-items center
</style>
