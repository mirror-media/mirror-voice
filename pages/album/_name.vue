<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv class="main__wrapper infos-wrapper">
        <Info
          :layout="'album'"
          :info="album"
          @clickPlay="playAlbum"
        />
      </AppDiv>
      <AppDiv
        :class="[
          'main__wrapper',
          'body-wrapper',
          { 'body-wrapper--fold': isBodyWrapperFold },
          { 'body-wrapper--expand': !isBodyWrapperFold }
        ]"
      >
        <AppH1 class="body-wrapper__title">
          簡介
        </AppH1>
        <div class="body-wrapper__body" v-html="brief" />
        <div
          class="body-wrapper__read-more read-more"
          @click="isBodyWrapperFold = !isBodyWrapperFold"
        >
          <BaseIconReadmore
            :class="[
              'read-more__icon',
              { 'read-more__icon--reverse': !isBodyWrapperFold }
            ]"
          />
        </div>
      </AppDiv>
      <AppDiv
        v-infinite-scroll="loadmore"
        infinite-scroll-disabled="shouldDisableLoadmore"
        class="main__wrapper tracks-wrapper"
      >
        <DivHeader class="tracks-wrapper__header">
          <template slot="left">
            專輯音檔（{{ tracks.meta.total }}）
          </template>
          <div
            slot="right"
            class="sorts"
          >
            <button
              :class="[
                'sorts__sort',
                { 'sorts__sort--dimmed': isTracksSortLatestFirst }
              ]"
              @click="isTracksSortLatestFirst = true"
            >
              最新
            </button>
            <button
              :class="[
                'sorts__sort',
                { 'sorts__sort--dimmed': !isTracksSortLatestFirst }
              ]"
              @click="isTracksSortLatestFirst = false"
            >
              最舊
            </button>
          </div>
        </DivHeader>
        <AppPlayingBanner
          v-if="tracks.meta.total > 0"
          class="tracks-wrapper__playing-banner"
          :is-playing.sync="isAlbumPlaying"
        >
          全部播放 ({{ tracks.meta.total }})
        </AppPlayingBanner>
        <BaseTrackList
          v-show="!isDesktop || isTracksFetched"
          class="tracks-wrapper__tracks"
          :show-list-order="true"
          :show-played-progress="true"
          :is-latest-first="isTracksSortLatestFirst"
          :current-sound="currentSound"
          :is-playing="appPlayer.isPlaying"
          :tracks="tracksWithPlayedProgress"
          :page="page"
          :total="tracks.meta.total"
          :items-per-page="isDesktop ? $MAXRESULT_TRACKS_ALBUM : tracks.meta.total"
          @playTrack="playTrack"
          @clickLink="handleClickLink"
        />
        <AppPagination
          v-if="tracks.meta.total > $MAXRESULT_TRACKS_ALBUM"
          class="tracks-wrapper__pagination"
          :total="tracks.meta.total"
          :items-per-page="$MAXRESULT_TRACKS_ALBUM"
          :page.sync="page"
        />
      </AppDiv>
    </div>
    <div slot="aside" class="aside">
      <AsideIntroVocal
        class="aside__wrapper author"
        :data="album"
        :title="'主播'"
        :img-style="'round'"
      />
      <AsideAlbumList
        class="aside__wrapper author-relateds"
        :data="vocalAlbums"
        @clickItem="handleClickAuthorRelateds"
      />
    </div>
  </AppMainAsideWrapper>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
import Vue from 'vue'

import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import Info from '~/components/Info/Info.vue'
import BaseIconReadmore from '~/components/BaseIconReadmore.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import AppPlayingBanner from '~/components/AppPlayingBanner.vue'
import AsideIntroVocal from '~/components/Aside/AsideIntro/AsideIntroVocal/Container.vue'
import AsideAlbumList from '~/components/Aside/AsideAlbumList.vue'
import BaseTrackList from '~/components/BaseTrackList.vue'
import AppPagination from '~/components/AppPagination.vue'

import sanitizeContent from '~/plugins/util/sanitizeContent'

if (process.browser) {
  const infiniteScroll = require('vue-infinite-scroll')
  Vue.use(infiniteScroll)
}

const fetchTracks = (app, albumId, isLatestFirst = true, page = 1) => {
  return app.$fetchSingle({
    max_results: app.$MAXRESULT_TRACKS_ALBUM,
    page,
    sort: `${isLatestFirst ? '-' : ''}publishedDate`,
    where: {
      albums: {
        $in: [albumId]
      }
    }
  })
}

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
    AppMainAsideWrapper,
    AppDiv,
    AppH1,
    Info,
    BaseIconReadmore,
    DivHeader,
    AppPlayingBanner,
    AsideIntroVocal,
    AsideAlbumList,
    BaseTrackList,
    AppPagination
  },
  head() {
    return this.$constructMeta({
      title: this.album.title,
      description: this.briefText,
      'og:url': this.$route.path,
      'og:image': _.get(this.$getImgs(this.album), ['desktop', 'url'])
    })
  },
  data() {
    return {
      isBodyWrapperFold: true,
      isTracksLoading: false,
      isTracksFetched: true,
      isTracksSortLatestFirst: true,
      // isAlbumPlaying: false,
      page: 1
    }
  },
  computed: {
    ...mapGetters({
      list: 'appPlayer/LIST'
    }),

    brief() {
      return sanitizeContent(_.get(this.album, ['brief', 'html'], ''))
    },
    briefText() {
      return this.$getHtmlText(this.brief)
    },

    ...mapState(['appPlayer']),
    currentSound() {
      return _.get(this.list, this.appPlayer.playingIndex, {})
    },
    isAlbumPlaying: {
      get() {
        /*
        ** 1. Check playing status in player
        ** 2. album's id in player === album's id on current page
        **    if ids are equal, we can say current album is playing
        */
        return (
          this.appPlayer.isPlaying &&
          this.appPlayer.albumId === _.get(this.album, 'id', '')
        )
      },
      set(val) {
        if (val) {
          this.playAlbum()
        } else {
          // pause
          this.SET_IS_PLAYING(false)
        }
      }
    },

    ...mapState({
      isDesktop: state => _.get(state, ['appUA', 'ua', 'isDesktop'], true)
    }),
    haveNextPageTracks() {
      return 'next' in _.get(this.tracks, 'links', {})
    },
    shouldDisableLoadmore() {
      return (
        this.isDesktop || (this.isTracksLoading || !this.haveNextPageTracks)
      )
    },

    ...mapState({
      localStorageTrackHistory: state =>
        state.localStorageTrackHistory.trackHistory
    }),
    tracksWithPlayedProgress() {
      let trackItems = _.get(this.tracks, 'items', [])
      trackItems = trackItems.map(item => {
        const trackInLocalStorageTrackHistory = _.find(
          this.localStorageTrackHistory,
          o => {
            const slug = _.get(o, ['lastTrackStorage', 'slug'], '')
            return slug === _.get(item, 'slug', '')
          }
        )
        if (trackInLocalStorageTrackHistory) {
          const duration = _.get(
            trackInLocalStorageTrackHistory,
            'lastTrackDurationTime',
            0
          )
          const playedTime = _.get(
            trackInLocalStorageTrackHistory,
            'lastTrackPlayedTime',
            0
          )
          const playedProgress = duration !== 0 ? playedTime / duration : 0
          return {
            ...item,
            playedProgress,
            duration,
            playedTime
          }
        } else {
          return item
        }
      })

      return trackItems
    }
  },
  watch: {
    isTracksSortLatestFirst() {
      this.fetchTracks(1)
    },
    page() {
      this.fetchTracks(this.page)
    }
  },
  async asyncData({ app, store, route, error }) {
    const routeParam = route.params.name
    const albums = await app.$fetchAlbums({
      writers: 'full',
      where: {
        name: {
          $in: [routeParam]
        }
      }
    })
    const album = _.get(albums, ['items', 0], {})
    const albumId = _.get(album, 'id', '')
    const isNotFound = albumId === ''
    if (isNotFound) {
      error({ statusCode: 404, message: 'album not found' })
    }

    // // Breadcrumb
    // // TODO: Refactoring with /single
    // const crumbSection = {
    //   title: _.get(album, ['sections', 0, 'title'], ''),
    //   path: `/section/${_.get(album, ['sections', 0, 'name'], '')}`
    // }
    // const crumbCategory = {
    //   title: _.get(album, ['categories', 0, 'title'], ''),
    //   path: `/category/${_.get(album, ['categories', 0, 'name'], '')}`
    // }
    // const crumbAlbum = {
    //   title: _.get(album, 'title', ''),
    //   path: `/album/${_.get(album, 'name', '')}`
    // }
    // const crumbs = [crumbSection, crumbCategory, crumbAlbum]
    // store.commit('appBreadcrumb/PUSH', crumbs)

    const vocalId = _.get(album, ['vocals', 0, 'id'], '')
    const [tracks, vocalAlbums] = await Promise.all([
      fetchTracks(app, albumId),
      app.$fetchAlbums({
        max_results: app.$MAXRESULT_ASIDEALBUMLIST_ALBUM,
        page: 1,
        sort: '-publishedDate',
        where: {
          $or: [{ vocals: vocalId }],
          // Filter out albums of empty vocals, which imply empty posts
          vocals: {
            $exists: true,
            $not: {
              $size: 0
            }
          }
        }
      })
    ])

    return {
      album,
      tracks,
      vocalAlbums
    }
  },
  methods: {
    async fetchTracks(page, shouldPush = false) {
      // this.page = page
      this.isTracksFetched = false
      const albumId = _.get(this.album, 'id', '')
      const tracks = await fetchTracks(
        this,
        albumId,
        this.isTracksSortLatestFirst,
        page
      )
      this.isTracksFetched = true

      if (shouldPush) {
        const { items = [], links = {}, meta = {} } = tracks
        this.tracks.items.push(...items)
        this.$set(this.tracks, 'links', links)
        this.$set(this.tracks, 'meta', meta)
      } else {
        this.$set(this, 'tracks', tracks)
      }
    },

    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    playAlbum(albumId = this.album.id) {
      this.SET_PLAYED_TIME(0)
      fetchPlayerTracks(this.$store, albumId, false)
      this.$sendGAAlbum({ action: 'click', label: 'play all' })
    },

    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_PLAYED_TIME: 'appPlayer/SET_PLAYED_TIME',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      SET_ALBUM_COVER: 'appPlayer/SET_ALBUM_COVER',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES',
      SET_IS_PLAYING: 'appPlayer/SET_IS_PLAYING'
    }),
    playTrack(slug) {
      this.SET_ALBUM_ID(this.album.id)
      this.SET_ALBUM_COVER(
        _.get(this.$getImgs(this.album), ['mobile', 'url'], '')
      )
      this.CLEAR_PAGES()

      /*
      ** Check track items are sorted by latest published date or not
      ** if not, reverse track items.
      */
      let tracks
      if (this.isTracksSortLatestFirst) {
        tracks = this.tracks
      } else {
        const itemsReversed = [...this.tracks.items].reverse()
        tracks = { ...this.tracks, items: itemsReversed }
      }

      this.SET_PLAYED_TIME(0)
      this.PREPARE_SINGLES({ page: this.page, res: tracks }).then(() => {
        const playingIndex = _.findIndex(this.list, o => o.slug === slug)
        this.SET_PLAYING_INDEX(playingIndex)

        const single = _.find(this.tracksWithPlayedProgress, o => {
          const _slug = _.get(o, 'slug', '')
          return _slug === slug
        })
        this.SET_PLAYED_TIME(_.get(single, 'playedTime', 0))
      })

      this.$sendGAAlbum({ action: 'click', label: 'play single' })
    },

    loadmore() {
      const page = _.get(this.tracks, ['meta', 'page'])
      if (page) {
        this.isTracksLoading = true
        this.fetchTracks(page + 1, true).then(() => {
          this.isTracksLoading = false
        })
      }
    },

    handleClickAuthorRelateds() {
      this.$sendGAAlbum({ action: 'click', label: 'other album of author' })
    },
    handleClickLink() {
      this.$sendGAAlbum({ action: 'click', label: 'single page' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  &__wrapper
    & + &
      margin 20px 0 0 0

.aside
  &__wrapper
    & + &
      margin 20px 0 0 0

.body-wrapper
  &__body
    margin 17px 0 0 0
    color black
    font-size 14px
    line-height 1.71
    text-align justify
    & >>> *
      margin 20px 0 0 0
    & >>> a
      color #21516f

.read-more
  display none

.sorts
  &__sort
    border none
    background-color transparent
    padding 0 14px
    line-height 1
    font-size 14px
    color #7d7d7d
    cursor pointer
    &--dimmed
      color black
    &:focus
      outline none
    &:first-child
      padding 0 14px 0 0
    &:last-child
      padding 0 0 0 14px
    & + &
      border-left 2px solid #7d7d7d

.tracks-wrapper
  min-height 555px
  position relative
  &__playing-banner
    display none !important
  &__tracks
    margin 18px 0 60px 0 !important
  &__pagination
    margin 20px 0 0 0
    position absolute
    bottom 25px
    width calc(100% - 25px - 25px)

@media (max-width 768px)
  .main
    &__wrapper
      // margin 0 13px
      & + &
        margin 13px 13px 0 13px

  .aside
    display none

  .infos-wrapper
    background-color transparent !important
    padding 13px !important

  .body-wrapper
    padding 13px 13px 19px 13px !important
    border-radius 2px
    box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.1)
    overflow-y hidden
    position relative
    &--fold
      max-height 90px
    &--expand
      max-height none
    &__title
      display none
    &__body
      margin 0
      color black
      font-size 13px
      line-height 1.54
      text-align justify
      & >>> *
        margin 20px 0 0 0
      & >>> *:nth-child(1)
        margin 0
    &__read-more
      width 100%
      height 19px
      background-color white
      position absolute
      bottom 0
      left 0

  .read-more
    display flex
    justify-content center
    align-items center
    &__icon
      &--reverse
        transform rotate(180deg)

  .tracks-wrapper
    min-height auto
    padding 0 !important
    border-radius 2px
    box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.1)
    &__header
      display none !important
    &__playing-banner
      display flex !important
    &__tracks
      margin 0 !important
    &__pagination
      display none !important
</style>
