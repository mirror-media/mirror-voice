<template>
  <div
    :class="[
      'app'
    ]"
  >
    <AppHeader
      class="app__header"
    />
    <!-- <AppBreadcrumb
      v-show="!hideBreadcrumb"
      class="app__breadcrumb"
    /> -->
    <div
      :class="[
        'app__view-wrapper',
        { 'app__view-wrapper--marginless': isPageHome },
      ]"
    >
      <nuxt />
    </div>
    <AppFooter />
    <NoSSR>
      <AppPlayer
        :class="[ 'app__player', { 'app__player--hide': !showPlayer } ]"
      />
    </NoSSR>
    <transition name="fade" mode="out-in">
      <AppLightboxWrapper
        v-show="showLightbox"
      >
        <AppPlayingError />
      </AppLightboxWrapper>
    </transition>
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

import NoSSR from 'vue-no-ssr'
import AppHeader from '~/components/AppHeader.vue'
// import AppBreadcrumb from '~/components/AppBreadcrumb.vue'
import AppFooter from '~/components/AppFooter.vue'
import AppPlayer from '~/components/AppPlayer.vue'
import AppLightboxWrapper from '~/components/AppLightboxWrapper.vue'
import AppPlayingError from '~/components/AppPlayingError.vue'
import AppNativeNotification from '~/components/AppNativeNotification.vue'

export default {
  components: {
    NoSSR,
    AppHeader,
    AppFooter,
    // AppBreadcrumb,
    AppPlayer,
    AppLightboxWrapper,
    AppPlayingError,
    AppNativeNotification
  },
  data() {
    return {
      showNativeNotification: true,
      enableNativeNotification: false,
      scrolledToBottom: false
    }
  },
  computed: {
    ...mapState({
      showPlayer: state => state.appPlayer.showAppPlayer,
      showLightbox: state => state.lightboxPlayingError.showLightbox
    }),
    // hideBreadcrumb() {
    //   const paths = ['/', '/tos', '/privacy_rule']
    //   return paths.includes(this.$route.path)
    // },
    shouldShowNativeNotification() {
      // name will be null if page is invalid and covered by 404/500
      return this.$route.name
    },
    isPageHome() {
      return this.$route.name && this.$route.name.includes('index')
    }
  },
  watch: {
    '$route.name'() {
      this.scrolledToBottom = false
    },
    scrolledToBottom() {
      if (this.scrolledToBottom) {
        this.sendScrollEvent()
      }
    }
  },
  mounted() {
    this.initScrollHandler()
  },
  methods: {
    closeNativeNotification() {
      this.showNativeNotification = false
    },
    sendScrollEvent() {
      const { name } = this.$route

      let sendGA
      if (name.includes('index')) {
        sendGA = this.$sendGAHome
      } else if (name.includes('section')) {
        sendGA = this.$sendGAListing
      } else if (name.includes('category')) {
        sendGA = this.$sendGAListing
      } else if (name.includes('album')) {
        sendGA = this.$sendGAAlbum
      } else if (name.includes('single')) {
        sendGA = this.$sendGASingle
      } else {
        return
      }

      sendGA({ action: 'scroll', label: 'end' })
    },
    initScrollHandler() {
      window.onscroll = () => {
        const bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.scrolledToBottom = true
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.app
  background-color #EFEFEF
  &__breadcrumb
    max-width 1000px
    margin 20px auto 0 auto
  &__view-wrapper
    margin 18px auto 60px auto
    min-height calc(100vh - 60px - 60px - 40px - 18px - 60px)
    &--marginless
      margin 0
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
    &__header
      position fixed
      top 0
      left 0
      width 100%
    &__breadcrumb
      display none
    &__view-wrapper
      margin 50px 0 5px 0
    &__native-notification
      transform translate(0, 325px)
      opacity 1
      animation popup .25s 2s forwards ease-out
      &--hide
        animation fadedown .25s forwards ease-out
</style>
