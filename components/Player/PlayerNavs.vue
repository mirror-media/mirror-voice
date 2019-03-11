<template>
  <nav class="navs">
    <img
      v-show="showNav"
      class="navs__backward"
      src="~/assets/img/btn_forward_normal.png"
      alt=""
      @click="$emit('backward')"
    >
    <img
      class="navs__play"
      :src="require(`~/assets/img/btn_${isPlaying ? 'pause' : 'play'}.png`)"
      alt=""
      @click="$emit(isPlaying ? 'pause' : 'play')"
    >
    <img
      v-show="showNav"
      class="navs__forward"
      src="~/assets/img/btn_backward_normal.png"
      alt=""
      @click="$emit('forward')"
    >
  </nav>
</template>

<script>
export default {
  props: {
    showNav: {
      type: Boolean,
      default: false
    },
    isPlaying: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.navs
  display flex
  align-items center
  &__backward
    height 14px
    cursor pointer
  &__play
    cursor pointer
    margin 0 18px
    height 28px
  &__forward
    height 14px
    cursor pointer

@media (max-width 768px)
  .navs
    &__backward
      display none
    &__play
      height 40px
      margin 0 18px 0 0
    &__forward
      height 15px
</style>
