<template>
  <div class="toggle-play">
    <img class="toggle-play__icon" :src="playIconSrc" alt="">
    <span class="toggle-play__text">
      <slot>{{ isPlaying ? '暫停' : '全部播放' }}</slot>
    </span>
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
  computed: {
    playIconSrc() {
      const state = this.isPlaying ? 'pause' : 'play'
      return require(`~/assets/img/btn_${state}.png`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.toggle-play
  display inline-flex
  align-items center
  height 36px
  cursor pointer
  &__icon
    width 36px
    height 36px
  &__text
    margin 0 0 0 16px
    font-size 18px
    color #d84939
</style>
