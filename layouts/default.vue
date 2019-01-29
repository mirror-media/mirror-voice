<template>
  <div class="app">
    <AppHeader/>
    <div class="app__view-wrapper">
      <nuxt/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="stylus" scoped>
.app
  background-color #eeeeee
  &__view-wrapper
    margin 18px auto 60px auto
</style>
