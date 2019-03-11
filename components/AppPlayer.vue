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
import { mapState, mapMutations, mapGetters } from 'vuex'

import Player from '~/components/Player/Player.vue'

const fetchPlayerTracks = (store, albumId, isLatestFirst = true, page = 1) => {
  return store.dispatch('appPlayer/FETCH', {
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
      pages: state => state.appPlayer.pages,
      albumId: state => state.appPlayer.albumId,
      playingIndex: state => state.appPlayer.playingIndex
    }),
    ...mapGetters({
      list: 'appPlayer/LIST'
    }),
    currentPageIndex() {
      return _.findKey(this.pages, o =>
        o.items.map(item => item.slug).includes(this.sound.slug)
      )
    },
    currentPage() {
      return this.pages[this.currentPageIndex]
    },
    currentPageLinks() {
      return _.get(this.currentPage, 'links', {})
    },
    currentPageMeta() {
      return _.get(this.currentPage, 'meta', {})
    },
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
            this.currentPageMeta.page + 1
          ).then(() => {
            index = _.findIndex(this.list, o => o.src === sound.src)
            this.SET_PLAYING_INDEX(index)
          })
        } else if (index === 0 && this.isListHavePrev) {
          fetchPlayerTracks(
            this.$store,
            this.albumId,
            true,
            this.currentPageMeta.page - 1
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
      // return 'prev' in this.links
      return 'prev' in this.currentPageLinks
    },
    isListHaveNext() {
      // return 'next' in this.links
      return 'next' in this.currentPageLinks
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

@media (max-width 768px)
  .player-wrapper
    background-color #191919
    padding 0 12px
</style>
