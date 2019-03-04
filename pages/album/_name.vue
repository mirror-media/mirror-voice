<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv class="main__wrapper info-wrapper">
        <Info
          :layout="'album'"
          :info="album"
          @clickPlay="playAlbum"
        />
      </AppDiv>
      <AppDiv class="main__wrapper body-wrapper">
        <AppH1 class="body-wrapper__title">
          簡介
        </AppH1>
        <div class="body-wrapper__body" v-html="brief" />
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
              :class="[ 'sorts__sort', { 'sorts__sort--dimmed': isTracksSortLatestFirst } ]"
              @click="isTracksSortLatestFirst = true"
            >
              最新
            </button>
            <button
              :class="[ 'sorts__sort', { 'sorts__sort--dimmed': !isTracksSortLatestFirst } ]"
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
    asideIntroFig() {
      return ''
    },
    asideIntroFigcaption() {
      return _.get(this.album, ['writers', 0, 'name'], '')
    },
    asideIntroDescription() {
      return sanitizeHtml(
        _.get(this.album, ['writers', 0, 'bio', 'html'], ''),
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
  async asyncData({ app, route }) {
    const routeParam = route.params.name
    const albums = await app.$fetchAlbums({
      where: {
        name: {
          $in: [routeParam]
        }
      }
    })
    const album = _.get(albums, ['items', 0], {})
    const albumId = _.get(album, 'id', '')
    const tracks = await fetchTracks(app, albumId)
    return {
      album,
      tracks
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
    playAlbum(slug) {
      this.PREPARE_SINGLES({ page: this.page, res: this.tracks }).then(() => {
        const playingIndex = _.findIndex(this.list, o => o.slug === slug)
        this.SET_PLAYING_INDEX(playingIndex)
      })
    },

    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID'
    }),
    playTrack(slug) {
      this.SET_ALBUM_ID(this.album.id)
      this.playAlbum(slug)
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
  &__tracks
    margin 18px 0 0 0
  &__pagination
    margin 20px 0 0 0
</style>
