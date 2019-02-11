<template>
  <div class="player-wrapper">
    <Player
      class="player-wrapper__player"
      :type="'long'"
    />
  </div>
</template>

<script>
import Player from '~/components/Player/Player.vue'

export default {
  components: {
    Player
  }
}
</script>

<style lang="stylus" scoped>
.player-wrapper
  position fixed
  bottom 0
  left 0
  width 100vw
  height 60px
  background-color #313131
  display flex
  justify-content center
  align-items center
</style>
