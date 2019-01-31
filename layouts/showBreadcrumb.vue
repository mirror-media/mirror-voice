<template>
  <div class="app">
    <AppHeader/>
    <AppBreadcrumb class="app__breadcrumb"/>
    <div class="app__view-wrapper">
      <nuxt/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppBreadcrumb from '~/components/AppBreadcrumb.vue'
import AppFooter from '~/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppBreadcrumb
  }
}
</script>

<style lang="stylus" scoped>
.app
  background-color #eeeeee
  &__breadcrumb
    max-width 1000px
    margin 20px auto 0 auto
  &__view-wrapper
    margin 18px auto 60px auto
</style>
