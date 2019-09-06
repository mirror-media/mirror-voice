<template>
  <select class="select" :value="value">
    <slot />
  </select>
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
.select
  background-color #eeeeee
  border none
  border-radius 4px
  min-width 270px
  height 40px
  padding 12px 17px
  color #7d7d7d
  &:focus
    outline none

@media (max-width 768px)
  .select
    padding 0 17px
    font-size 13px
</style>
