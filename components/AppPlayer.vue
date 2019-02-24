<template>
  <div class="player-wrapper">
    <Player
      class="player-wrapper__player"
      :type="'long'"
      :sound.sync="sound"
      :list="list"
      :volume.sync="playerVolume"
      :muted.sync="playerMuted"
      :playback-rate.sync="playerplaybackRate"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import Player from '~/components/Player/Player.vue'

export default {
  components: {
    Player
  },
  data() {
    return {
      internalSound: {},
      playerVolume: 1,
      playerMuted: false,
      playerplaybackRate: 1
    }
  },
  computed: {
    ...mapState({
      list: state => state.appPlayer.list
    }),
    sound: {
      get() {
        return _.isEmpty(this.internalSound) ? this.list[0] : this.internalSound
      },
      set(sound) {
        const index = _.findIndex(this.list, o => o.src === sound.src)
        this.internalSound = this.list[index]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.player-wrapper
  width 100vw
  height 60px
  background-color #313131
  display flex
  justify-content center
  align-items center
</style>
