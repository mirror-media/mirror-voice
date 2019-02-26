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
import { mapState, mapMutations } from 'vuex'

import Player from '~/components/Player/Player.vue'

export default {
  components: {
    Player
  },
  data() {
    return {
      // internalSound: {},
      playerVolume: 1,
      playerMuted: false,
      playerplaybackRate: 1
    }
  },
  computed: {
    ...mapState({
      list: state => state.appPlayer.list,
      meta: state => state.appPlayer.meta,
      links: state => state.appPlayer.links,
      albumId: state => state.appPlayer.albumId,
      playingIndex: state => state.appPlayer.playingIndex
    }),
    sound: {
      get() {
        return this.list[this.playingIndex]
      },
      set(sound) {
        const index = _.findIndex(this.list, o => o.src === sound.src)
        this.SET_PLAYING_INDEX(index)
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX'
    })
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
  z-index 1000
</style>
