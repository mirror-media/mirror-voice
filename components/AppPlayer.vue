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
      @ended="handleEnded"
      @loadstart="hanldeLoadstart"
      @backward="handleBackward"
      @forward="handleForward"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import queryString from 'query-string'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

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
      playerplaybackRate: 1,
      latestSingle: {}
    }
  },
  computed: {
    ...mapState({
      pages: state => state.appPlayer.pages,
      albumId: state => state.appPlayer.albumId,
      playingIndex: state => state.appPlayer.playingIndex,
      isPlaying: state => state.appPlayer.isPlaying,
      playedTime: state => state.appPlayer.playedTime,
      lastTrackStorage: state => state.localStorageLastTrack.lastTrackStorage,
      lastTrackPlayedTime: state =>
        state.localStorageLastTrack.lastTrackPlayedTime
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
        } else if (!sound && !_.isEmpty(this.latestSingle)) {
          return this.latestSingle
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
    soundSlug() {
      return _.get(this.sound, 'slug', '')
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
  created() {
    this.$fetchSingle({
      max_results: 1,
      page: 1,
      sort: '-publishedDate',
      embedded: {
        albums: 1
      }
    }).then(({ items = [] }) => {
      const singleItems = items.map(d => ({
        title: _.get(d, 'title', ''),
        cover: _.get(this.$getImgs(d), ['mobile', 'url'], ''),
        link: `/single/${_.get(d, 'slug', '')}`,
        slug: _.get(d, 'slug', ''),
        src: this.$getSingleSoundSrc(d)
      }))
      this.latestSingle = _.get(singleItems, 0, {})
    })
  },
  methods: {
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_IS_PLAYING: 'appPlayer/SET_IS_PLAYING',
      SET_DUARTION: 'appPlayer/SET_DUARTION',
      SET_PLAYED_TIME: 'appPlayer/SET_PLAYED_TIME',
      SHOW_APP_PLAYER: 'appPlayer/SHOW_APP_PLAYER',
      SET_SHOW_LIGHTBOX: 'lightboxPlayingError/SET_SHOW_LIGHTBOX'
    }),
    ...mapActions({
      MEMORIZE_TRACK: 'localStorageLastTrack/MEMORIZE_TRACK',
      MEMORIZE_TRACK_PLAYEDTIME:
        'localStorageLastTrack/MEMORIZE_TRACK_PLAYEDTIME',
      MEMORIZE_TRACK_DURATIONTIME:
        'localStorageLastTrack/MEMORIZE_TRACK_DURATIONTIME'
    }),
    syncPlay() {
      this.SET_IS_PLAYING(true)

      if (this.currentPlayedTime) {
        this.$sendGAAppPlayer({
          action: 'play_continue',
          label: this.soundSlug,
          value: this.currentPlayedTime
        })
      }
    },
    syncPause() {
      this.SET_IS_PLAYING(false)

      this.$sendGAAppPlayer({
        action: 'play_pause',
        label: this.soundSlug,
        value: this.currentPlayedTime
      })
    },
    syncDuration(e) {
      const duration = _.get(e, ['target', 'duration'], 0)
      this.SET_DUARTION(duration)
      this.MEMORIZE_TRACK_DURATIONTIME(duration)
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
    },

    handleEnded() {
      this.$sendGAAppPlayer({
        action: 'play_end',
        label: this.soundSlug,
        value: this.currentPlayedTime
      })
    },
    hanldeLoadstart() {
      const localStorageTrackHistory = _.get(
        this.$store.state,
        ['localStorageTrackHistory', 'trackHistory'],
        []
      )
      const currentTrackSlug = this.soundSlug
      const currentTrackIndexInHistory = _.findIndex(
        localStorageTrackHistory,
        o => {
          const slug = _.get(o, ['lastTrackStorage', 'slug'], '')
          return slug === currentTrackSlug
        }
      )
      const lastTrack = _.get(
        localStorageTrackHistory,
        currentTrackIndexInHistory - 1,
        {}
      )

      this.$sendGAAppPlayer({
        action: 'play_other',
        label: _.get(lastTrack, ['lastTrackStorage', 'slug'], ''),
        value: _.get(lastTrack, 'lastTrackPlayedTime', 0)
      })
    },

    handleBackward() {
      this.SET_PLAYED_TIME(0)
    },
    handleForward() {
      this.SET_PLAYED_TIME(0)
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
