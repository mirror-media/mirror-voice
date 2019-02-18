<template>
  <header class="header">
    <nuxt-link to="/">
      <img class="header__logo" src="~/assets/img/logo.svg" alt="">
    </nuxt-link>
    <!-- <div @click="tooglePlayerFixed">
      toggle fixed player
    </div> -->
  </header>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['TOGGLE_APP_PLAYER']),
    tooglePlayerFixed() {
      this.TOGGLE_APP_PLAYER()
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  height 70px
  background-color #d84939
  padding 0 0 0 20px
  display flex
  align-items center
  &__logo
    width 100px
</style>
