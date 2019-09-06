<template>
  <input class="input" :value="value">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.input
  background-color #eeeeee
  border none
  border-radius 4px
  min-width 270px
  height 40px
  padding 12px 17px
  &:focus
    outline none
</style>
