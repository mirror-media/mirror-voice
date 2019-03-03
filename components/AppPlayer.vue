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

const fetchPlayerTracks = (
  store,
  albumId,
  isLatestFirst = true,
  page = 1,
  mode
) => {
  return store.dispatch('appPlayer/FETCH', {
    mode,
    max_results: 10,
    page,
    sort: `${isLatestFirst ? '-' : ''}publishedDate`,
    where: {
      albums: {
        $in: [albumId]
      }
    }
  })
}

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
        let index = _.findIndex(this.list, o => o.src === sound.src)
        // Should fetch next page
        if (index === this.list.length - 1 && this.isListHaveNext) {
          fetchPlayerTracks(
            this.$store,
            this.albumId,
            true,
            this.meta.page + 1,
            'push'
          ).then(() => {
            index = _.findIndex(this.list, o => o.src === sound.src)
            this.SET_PLAYING_INDEX(index)
          })
        } else if (index === 0 && this.isListHavePrev) {
          fetchPlayerTracks(
            this.$store,
            this.albumId,
            true,
            this.meta.page - 1,
            'unshift'
          ).then(() => {
            index = _.findIndex(this.list, o => o.src === sound.src)
            this.SET_PLAYING_INDEX(index)
          })
        } else {
          this.SET_PLAYING_INDEX(index)
        }
      }
    },
    isListHavePrev() {
      return 'prev' in this.links
    },
    isListHaveNext() {
      return 'next' in this.links
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
