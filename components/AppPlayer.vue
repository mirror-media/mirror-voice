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
      :should-playing="isPlaying"
      :played-time.sync="currentPlayedTime"
      @play="syncPlay"
      @pause="syncPause"
      @durationchange="syncDuration"
      @error="onError"
      @playingError="onPlayingError"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import queryString from 'query-string'
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
      playingIndex: state => state.appPlayer.playingIndex,
      isPlaying: state => state.appPlayer.isPlaying,
      playedTime: state => state.appPlayer.playedTime,
      lastTrackStorage: state => state.localStorage.lastTrackStorage,
      lastTrackPlayedTime: state => state.localStorage.lastTrackPlayedTime
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
        const sound = this.list[this.playingIndex]
        if (!sound && !_.isEmpty(this.lastTrackStorage)) {
          this.SHOW_APP_PLAYER()
          return this.lastTrackStorage
        }
        this.MEMORIZE_TRACK(sound)
        return sound
      },
      set(sound) {
        let index = _.findIndex(this.list, o => o.src === sound.src)
        const shouldFetchNextPage =
          index === this.list.length - 1 && this.isListHaveNext
        const shouldFetchPrevPage = index === 0 && this.isListHavePrev
        if (shouldFetchNextPage) {
          // NOTE: workaround for specify the sort
          const sort = _.get(
            queryString.parse(
              _.get(this.currentPageLinks, ['next', 'href'], '')
            ),
            'sort',
            ''
          )
          fetchPlayerTracks(
            this.$store,
            this.albumId,
            sort !== 'publishedDate',
            this.currentPageMeta.page + 1
          ).then(() => {
            index = _.findIndex(this.list, o => o.src === sound.src)
            this.SET_PLAYING_INDEX(index)
          })
        } else if (shouldFetchPrevPage) {
          // NOTE: workaround for specify the sort
          const sort = _.get(
            queryString.parse(
              _.get(this.currentPageLinks, ['prev', 'href'], '')
            ),
            'sort',
            ''
          )
          fetchPlayerTracks(
            this.$store,
            this.albumId,
            sort !== 'publishedDate',
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
    currentPlayedTime: {
      get() {
        const sound = this.list[this.playingIndex]
        if (!sound && !_.isEmpty(this.lastTrackStorage)) {
          return this.lastTrackPlayedTime
        }
        return this.playedTime
      },
      set(time) {
        this.SET_PLAYED_TIME(time)
        this.MEMORIZE_TRACK_PLAYEDTIME(time)
      }
    },
    isListHavePrev() {
      return 'prev' in this.currentPageLinks
    },
    isListHaveNext() {
      return 'next' in this.currentPageLinks
    }
  },
  methods: {
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_IS_PLAYING: 'appPlayer/SET_IS_PLAYING',
      SET_DUARTION: 'appPlayer/SET_DUARTION',
      SET_PLAYED_TIME: 'appPlayer/SET_PLAYED_TIME',
      SHOW_APP_PLAYER: 'appPlayer/SHOW_APP_PLAYER',
      SET_SHOW_LIGHTBOX: 'lightboxPlayingError/SET_SHOW_LIGHTBOX',
      MEMORIZE_TRACK: 'localStorage/MEMORIZE_TRACK',
      MEMORIZE_TRACK_PLAYEDTIME: 'localStorage/MEMORIZE_TRACK_PLAYEDTIME'
    }),
    syncPlay() {
      this.SET_IS_PLAYING(true)
    },
    syncPause() {
      this.SET_IS_PLAYING(false)
    },
    syncDuration(e) {
      const duration = _.get(e, ['target', 'duration'], 0)
      this.SET_DUARTION(duration)
    },

    onError(e) {
      if (e.target.getAttribute('src') !== '') {
        this.SET_SHOW_LIGHTBOX(true)
      }
    },
    onPlayingError(error) {
      if (error.name === 'NotSupportedError') {
        this.SET_SHOW_LIGHTBOX(true)
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
  z-index 1000

@media (max-width 768px)
  .player-wrapper
    background-color #191919
    padding 0 12px
</style>
