<template>
  <div
    :class="[
      'banner',
      { 'banner--playing': isPlaying }
    ]"
    @click="toggle"
  >
    <img
      class="banner__icon"
      :src="require(`~/assets/img/${isPlaying ? 'pause' : 'play'}_white.png`)"
      alt=""
    >
    <p class="banner__text">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      // this.$emit(this.isPlaying ? 'pause' : 'play')
      this.$emit('update:isPlaying', !this.isPlaying)
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
  cursor pointer
  width 100%
  height 50px
  border-radius 2px
  box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.5)
  background-color #df4c3c
  display flex
  align-items center
  padding 0 0 0 25px
  transition background-color .25s ease-out
  &--playing
    background-color #273947
  &__icon
    height 20px
    min-width 16px
  &__text
    font-size 15px
    font-weight 600
    color white
    margin 0 0 0 24px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
