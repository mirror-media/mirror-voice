<template>
  <div class="marker">
    <BaseIconPlaying
      v-show="status === 'playing'"
      class="marker__playing"
    />
    <div
      v-show="status === 'order'"
      :class="[
        'marker__order',
        { 'marker__order--should-hide': status === 'playing' }
      ]"
    >
      {{ order }}
    </div>
    <img
      v-show="status === 'play'"
      class="marker__play-icon"
      src="~/assets/img/btn_smallplay.png"
      alt=""
    >
  </div>
</template>

<script>
import BaseIconPlaying from './BaseIconPlaying.vue'

export default {
  components: {
    BaseIconPlaying
  },
  props: {
    status: {
      type: String,
      default: 'order',
      validator(value) {
        return ['order', 'play', 'pause', 'playing'].includes(value)
      }
    },
    order: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.marker
  display flex
  justify-content center
  align-items center
  min-width 24px
  max-width 24px
  &__order
    font-size 14px
    color #7d7d7d
  &__play-icon
    height 13px

@media (max-width 768px)
  .marker
    min-width 36px
    max-width 36px
    &__order
      font-size 11px
      display initial !important
      &--should-hide
        display none !important
    &__play-icon
      display none !important
</style>
