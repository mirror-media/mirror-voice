<template>
  <div class="tag">
    {{ tag.name }}
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      default() {
        return {}
      },
      validator(value) {
        return !!value.name
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag
  padding 7px 11px
  background-color #eeeeee
  font-size 14px
  color #7d7d7d
</style>
