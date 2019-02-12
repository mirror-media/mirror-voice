<template>
  <div class="progress">
    <div
      class="progress__buffer"
      :style="{ width: `${bufferedAmount}%` }"
    >
    </div>
    <div
      class="progress__played"
      :style="{ width: `${playedAmount}%` }"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bufferedAmount: {
      type: Number,
      default: 0
      // validator(value) {
      //   return value >= 0 && value <= 100
      // }
    },
    playedAmount: {
      type: Number,
      default: 0
      // validator(value) {
      //   return value >= 0 && value <= 100
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
.progress
  height 4px
  border-radius 2px
  background-color black
  position relative
  &__buffer
    position absolute
    left 0
    top 0
    // width 10%
    height 4px
    border-radius 2px
    background-color #7d7d7d
  &__played
    position absolute
    left 0
    top 0
    // width 10%
    height 4px
    border-radius 2px
    background-color #d84939
</style>
