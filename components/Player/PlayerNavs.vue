<template>
  <nav class="navs">
    <img
      v-if="showNav"
      class="navs__backward"
      src="~/assets/img/btn_forward_normal.png"
      alt=""
      @click="$emit('backward')"
    >
    <img
      :class="[ 'navs__play', `navs__play--${showNav ? 'small' : 'large'}` ]"
      :src="require(`~/assets/img/btn_${isPlaying ? 'pause' : 'play'}.png`)"
      alt=""
      @click="$emit(isPlaying ? 'pause' : 'play')"
    >
    <img
      v-if="showNav"
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
    margin 0 18px 0 0
    cursor pointer
  &__forward
    height 14px
    margin 0 0 0 18px
    cursor pointer
  &__play
    cursor pointer
    &--small
      height 28px
    &--large
      height 31px
</style>
