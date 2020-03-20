<template>
  <nav class="navs">
    <img
      v-show="showTimeControl"
      class="navs__rewind"
      src="~/assets/img/skip15secback.svg"
      alt=""
      @click="$emit('rewind')"
    >
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
    <img
      v-show="showTimeControl"
      class="navs__fastforward"
      src="~/assets/img/skip15sec.svg"
      alt=""
      @click="$emit('fastforward')"
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
    showTimeControl: {
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
  &__rewind
    height 23px
    cursor pointer
    margin 0 18px 0 0
  &__backward
    height 14px
    cursor pointer
    margin 0 18px 0 0
  &__play
    cursor pointer
    height 28px
  &__forward
    height 14px
    cursor pointer
    margin 0 0 0 18px
  &__fastforward
    height 23px
    cursor pointer
    margin 0 0 0 18px

@media (max-width 768px)
  .navs
    &__rewind
      display none
    &__backward
      display none
    &__play
      height 40px
      // margin 0 18px 0 0
    &__forward
      height 15px
    &__fastforward
      display none
</style>
