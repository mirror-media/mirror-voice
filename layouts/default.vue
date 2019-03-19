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
    <AppNativeNotification
      v-if="enableNativeNotification"
      v-show="shouldShowNativeNotification"
      :class="[
        'app__native-notification',
        { 'app__native-notification--hide': !showNativeNotification }
      ]"
      @close="closeNativeNotification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppHeader from '~/components/AppHeader.vue'
import AppBreadcrumb from '~/components/AppBreadcrumb.vue'
import AppFooter from '~/components/AppFooter.vue'
import AppPlayer from '~/components/AppPlayer.vue'
import AppNativeNotification from '~/components/AppNativeNotification.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppBreadcrumb,
    AppPlayer,
    AppNativeNotification
  },
  data() {
    return {
      showNativeNotification: true,
      enableNativeNotification: false
    }
  },
  computed: {
    ...mapState({
      showPlayer: state => state.appPlayer.showAppPlayer
    }),
    hideBreadcrumb() {
      const paths = ['/', '/tos', '/privacy_rule']
      return paths.includes(this.$route.path)
    },
    shouldShowNativeNotification() {
      // name will be null if page is invalid and covered by 404/500
      return this.$route.name
    }
  },
  methods: {
    closeNativeNotification() {
      this.showNativeNotification = false
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
    position fixed
    bottom 0
    left 0
    opacity 1
    transform translate(0, 0)
    transition transform .25s ease-out, opacity .25s ease-out
    &--hide
      opacity 0
      transform translate(0, 60px)

@keyframes popup
  0%
    transform translate(0, 325px)
  100%
    transform translate(0, 0)
@keyframes fadedown
  0%
    transform translate(0, 0)
  100%
    transform translate(0, 325px)

@media (max-width 768px)
  .app
    &__breadcrumb
      display none
    &__view-wrapper
      margin 0
    &__native-notification
      transform translate(0, 325px)
      opacity 1
      animation popup .25s 2s forwards ease-out
      &--hide
        animation fadedown .25s forwards ease-out
</style>
