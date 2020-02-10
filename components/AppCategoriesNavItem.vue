<template>
  <nuxt-link
    class="nav"
    :to="to"
    v-text="text"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  color #6F6F6F
  font-size 16px
  border-bottom 3px solid transparent
  padding 0 0 5px 0
  transition color .25s ease-out, border-bottom .25s ease-out
  &:hover
    color black
    font-weight bold
    border-bottom 3px solid #FF6D2D
</style>
