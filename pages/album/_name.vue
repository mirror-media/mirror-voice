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
          <div
            :class="[
              'read-more__icon',
              { 'read-more__icon--reverse': !isBodyWrapperFold }
            ]"
          />
        </div>
      </AppDiv>
      <AppDiv class="main__wrapper tracks-wrapper">
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
        <TrackList
          v-show="isTracksFetched"
          class="tracks-wrapper__tracks"
          :show-list-order="true"
          :is-latest-first="isTracksSortLatestFirst"
          :tracks="tracks.items"
          :page="page"
          :total="tracks.meta.total"
          :items-per-page="$MAXRESULT_TRACKS_ALBUM"
          @playTrack="playTrack"
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
      <AsideIntro
        class="aside__wrapper anchor"
        :title="'主播'"
        :img-style="'round'"
        :fig="asideIntroFig"
        :figcaption="asideIntroFigcaption"
        :description="asideIntroDescription"
      />
      <AsideAlbumList
        class="aside__wrapper anchor-relateds"
        :data="writerAlbums"
      />
    </div>
  </AppMainAsideWrapper>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import sanitizeHtml from 'sanitize-html'
import _ from 'lodash'

import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import Info from '~/components/Info/Info.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import AsideIntro from '~/components/Aside/AsideIntro.vue'
import AsideAlbumList from '~/components/Aside/AsideAlbumList.vue'
import TrackList from '~/components/Track/TrackList.vue'
import AppPagination from '~/components/AppPagination.vue'

const fetchTracks = (app, albumId, isLatestFirst = true, page = 1) => {
  return app.$fetchSingleListing({
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
    DivHeader,
    AsideIntro,
    AsideAlbumList,
    TrackList,
    AppPagination
  },
  data() {
    return {
      isBodyWrapperFold: true,
      isTracksLoading: false,
      isTracksFetched: true,
      isTracksSortLatestFirst: true,
      page: 1
    }
  },
  computed: {
    ...mapGetters({
      list: 'appPlayer/LIST'
    }),

    brief() {
      return sanitizeHtml(
        _.get(this.album, ['brief', 'html'], ''),
        this.$SANITIZE_HTML_DEFAULT_OPTIONS
      )
    },

    // For aside intro
    writer() {
      return _.get(this.album, ['writers', 0], {})
    },
    asideIntroFig() {
      return _.get(this.$getImgs(this.writer), ['mobile', 'url'], '')
    },
    asideIntroFigcaption() {
      return _.get(this.writer, 'name', '')
    },
    asideIntroDescription() {
      return sanitizeHtml(
        _.get(this.writer, ['bio', 'html'], ''),
        this.$SANITIZE_HTML_DEFAULT_OPTIONS
      )
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

    // Breadcrumb
    // TODO: Refactoring with /single
    const crumbSection = {
      title: _.get(album, ['sections', 0, 'title'], ''),
      path: `/section/${_.get(album, ['sections', 0, 'name'], '')}`
    }
    const crumbCategory = {
      title: _.get(album, ['categories', 0, 'title'], ''),
      path: `/category/${_.get(album, ['categories', 0, 'name'], '')}`
    }
    const crumbAlbum = {
      title: _.get(album, 'title', ''),
      path: `/album/${_.get(album, 'name', '')}`
    }
    const crumbs = [crumbSection, crumbCategory, crumbAlbum]
    store.commit('appBreadcrumb/PUSH', crumbs)

    const writerId = _.get(album, ['writers', 0, 'id'], '')
    const [tracks, writerAlbums] = await Promise.all([
      fetchTracks(app, albumId),
      app.$fetchAlbums({
        max_results: app.$MAXRESULT_ASIDEALBUMLIST_ALBUM,
        page: 1,
        sort: '-publishedDate',
        where: {
          $or: [{ writers: writerId }]
        }
      })
    ])

    return {
      album,
      tracks,
      writerAlbums
    }
  },
  methods: {
    async fetchTracks(page) {
      this.page = page
      this.isTracksFetched = false
      const albumId = _.get(this.album, 'id', '')
      const tracks = await fetchTracks(
        this,
        albumId,
        this.isTracksSortLatestFirst,
        page
      )
      this.isTracksFetched = true

      this.$set(this, 'tracks', tracks)
    },

    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    playAlbum(albumId = this.album.id) {
      fetchPlayerTracks(this.$store, albumId)
    },

    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES'
    }),
    playTrack(slug) {
      this.SET_ALBUM_ID(this.album.id)
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

      this.PREPARE_SINGLES({ page: this.page, res: tracks }).then(() => {
        const playingIndex = _.findIndex(this.list, o => o.slug === slug)
        this.SET_PLAYING_INDEX(playingIndex)
      })
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
    color #7d7d7d
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
  &__tracks
    margin 18px 0 0 0 !important
  &__pagination
    margin 20px 0 0 0
    position absolute
    bottom 25px
    width calc(100% - 25px - 25px)

@media (max-width 768px)
  .aside
    display none

  .infos-wrapper
    background-color transparent !important
    padding 13px !important

  .body-wrapper
    margin 0 13px !important
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
      width 0
      height 0
      border-style solid
      border-width 5px 5px 0 5px
      border-color #4a4a4a transparent transparent transparent
      transform rotate(0deg)
      &--reverse
        transform rotate(180deg)
</style>
