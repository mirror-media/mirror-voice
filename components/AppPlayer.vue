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

const fetchPlayerTracks = (store, albumId, isLatestFirst = true, page = 1) => {
  return store.dispatch('appPlayer/FETCH', {
    mode: 'push',
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
      albumId: state => state.appPlayer.albumId,
      playingIndex: state => state.appPlayer.playingIndex,
      meta: state => state.appPlayer.meta
    }),
    // sound: {
    //   get() {
    //     return _.isEmpty(this.internalSound)
    //       ? this.list[this.playingIndex]
    //       : this.internalSound
    //   },
    //   set(sound) {
    //     const index = _.findIndex(this.list, o => o.src === sound.src)
    //     this.internalSound = this.list[index]
    //     this.SET_PLAYING_INDEX(index)
    //   }
    // }
    sound: {
      get() {
        return this.list[this.playingIndex]
      },
      set(sound) {
        const index = _.findIndex(this.list, o => o.src === sound.src)

        const { page, total } = this.meta
        const shouldLoadNextPageTracks =
          index === this.list.length - 1 && this.list.length < total
        const shouldLoadPrevPageTracks = index === 0 && this.list.length < total

        if (shouldLoadNextPageTracks) {
          fetchPlayerTracks(this.$store, this.albumId, true, page + 1).then(
            () => {
              const index = _.findIndex(this.list, o => o.src === sound.src)
              this.SET_PLAYING_INDEX(index)
            }
          )
        } else if (shouldLoadPrevPageTracks) {
          fetchPlayerTracks(this.$store, this.albumId, true, page - 1).then(
            () => {
              const index = _.findIndex(this.list, o => o.src === sound.src)
              this.SET_PLAYING_INDEX(index)
            }
          )
        } else {
          this.SET_PLAYING_INDEX(index)
        }
      }
    }
  },
  // watch: {
  //   sound() {
  //     const { maxResults, page, total } = this.meta

  //     const shouldLoadNextPageTracks =
  //       this.playingIndex === this.list.length - 1 && maxResults * page < total
  //     const shouldLoadPrevPageTracks = this.playingIndex === 0 && page > 1

  //     if (shouldLoadNextPageTracks) {
  //       console.log('shouldLoadNextPageTracks')
  //       fetchPlayerTracks(this.$store, this.albumId, true, page + 1)
  //     } else if (shouldLoadPrevPageTracks) {
  //       console.log('shouldLoadPrevPageTracks')
  //       fetchPlayerTracks(this.$store, this.albumId, true, page - 1)
  //     }
  //   }
  // },
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
