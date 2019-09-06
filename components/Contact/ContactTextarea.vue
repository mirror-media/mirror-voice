<template>
  <textarea class="textarea" type="text" :value="value" />
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
.textarea
  background-color #eeeeee
  border none
  border-radius 4px
  height 150px
  padding 12px 17px
  resize none
  &:focus
    outline none
</style>
