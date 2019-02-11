<template>
  <div class="app">
    <AppHeader/>
    <div class="app__view-wrapper">
      <nuxt/>
    </div>
    <AppFooter/>
    <AppPlayer
      :class="[ 'app__player', { 'app__player--hide': !showPlayer } ]"
    />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import AppPlayer from '~/components/AppPlayer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppPlayer
  },
  computed: {
    ...mapState({
      showPlayer: state => state.showAppPlayer
    })
  }
}
</script>

<style lang="stylus" scoped>
.app
  background-color #eeeeee
  &__view-wrapper
    margin 18px auto 60px auto
  &__player
    transition transform .25s ease-out
    transform translate(0, 0)
    &--hide
      transform translate(0, 60px)
</style>
