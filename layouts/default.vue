<template>
  <div class="app">
    <AppHeader />
    <AppBreadcrumb
      v-show="!hideBreadcrumb"
      class="app__breadcrumb"
    />
    <div class="app__view-wrapper">
      <nuxt />
    </div>
    <AppFooter />
    <AppPlayer
      :class="[ 'app__player', { 'app__player--hide': !showPlayer } ]"
    />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppBreadcrumb from '~/components/AppBreadcrumb.vue'
import AppFooter from '~/components/AppFooter.vue'
import AppPlayer from '~/components/AppPlayer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppBreadcrumb,
    AppPlayer
  },
  computed: {
    ...mapState({
      showPlayer: state => state.showAppPlayer
    }),
    hideBreadcrumb() {
      const paths = ['/', '/tos']
      return paths.includes(this.$route.path)
    }
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
  &__player
    opacity 1
    transform translate(0, 0)
    transition transform .25s ease-out, opacity .25s ease-out
    &--hide
      opacity 0
      transform translate(0, 60px)
</style>
