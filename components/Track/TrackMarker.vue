<template>
  <div class="marker">
    <div
      v-show="status === 'order'"
      class="marker__order"
    >
      1
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
export default {
  props: {
    status: {
      type: String,
      default: 'order',
      validator(value) {
        return ['order', 'play', 'pause'].includes(value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.marker
  display flex
  justify-content center
  align-items center
  width 13px
  &__order
    font-size 14px
    color #7d7d7d
  &__play-icon
    height 13px
</style>
