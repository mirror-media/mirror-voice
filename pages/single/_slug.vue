<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv
        class="main__wrapper info-wrapper"
      >
        <Info
          class="info-wrapper__info"
          :info="single"
          @clickPlay="playSingle"
        />
      </AppDiv>
      <AppDiv class="main__wrapper body-wrapper">
        <AppH1 class="body-wrapper__title">
          文稿
        </AppH1>
        <!-- NoSSR due to SEO concerns -->
        <NoSSR>
          <div class="body-wrapper__body" v-html="content" />
        </NoSSR>
      </AppDiv>
    </div>
    <div slot="aside" class="aside">
      <AsideIntro
        class="aside__wrapper album"
        :title="'收錄於'"
        :fig="asideIntroFig"
        :figcaption="asideIntroFigcaption"
        :description="asideIntroDescription"
      />
      <AsideTrackList
        class="aside__wrapper"
        :album="album"
        :tracks="tracks.items"
        @playTrack="playTrack"
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
import AsideIntro from '~/components/Aside/AsideIntro.vue'
import AsideTrackList from '~/components/Aside/AsideTrackList.vue'
import NoSSR from 'vue-no-ssr'

const fetchTracks = (app, albumId, isLatestFirst = true, page = 1) => {
  return app.$fetchSingleListing({
    max_results: app.$MAXRESULT_TRACKS_SINGLE,
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
    AsideIntro,
    AsideTrackList,
    NoSSR
  },
  computed: {
    ...mapGetters({
      list: 'appPlayer/LIST'
    }),

    content() {
      return sanitizeHtml(
        _.get(this.single, ['content', 'html'], ''),
        this.$SANITIZE_HTML_DEFAULT_OPTIONS
      )
    },

    // For aside intro
    asideIntroFig() {
      return _.get(this.$getImgs(this.album), ['mobile', 'url'], '')
    },
    asideIntroFigcaption() {
      return _.get(this.album, 'title', '')
    },
    asideIntroDescription() {
      return sanitizeHtml(
        _.get(this.album, ['brief', 'html'], ''),
        this.$SANITIZE_HTML_DEFAULT_OPTIONS
      )
    }
  },
  async asyncData({ app, store, route, error }) {
    // TODO: maybe we could have better implement
    const routeParam = route.params.slug

    const singles = await app.$fetchSingle({
      where: {
        slug: {
          $in: [routeParam]
        }
      }
    })
    const single = _.get(singles, ['items', 0], {})

    const albumId = _.get(single, ['albums', 0], '')
    const isNotFound = _.isEmpty(single)
    if (isNotFound) {
      error({ statusCode: 404, message: 'single not found' })
    }

    const albums = await app.$fetchAlbums({
      where: {
        _id: {
          $in: [albumId]
        }
      }
    })
    const album = _.get(albums, ['items', 0], {})

    // Breadcrumb
    // TODO: Refactoring with /album
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
    const crumbSingle = {
      title: _.get(single, 'title', ''),
      path: `/single/${_.get(single, 'slug', '')}`
    }
    const crumbs = [crumbSection, crumbCategory, crumbAlbum, crumbSingle]
    store.commit('appBreadcrumb/PUSH', crumbs)

    const tracks = await fetchTracks(app, albumId)

    return {
      single,
      album,
      tracks
    }
  },
  methods: {
    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES'
    }),
    playTrack(slug) {
      this.SET_ALBUM_ID(this.album.id)
      this.CLEAR_PAGES()

      this.PREPARE_SINGLES({ page: 1, res: this.tracks }).then(() => {
        const playingIndex = _.findIndex(this.list, o => o.slug === slug)
        this.SET_PLAYING_INDEX(playingIndex)
      })
    },
    playSingle() {
      this.SET_ALBUM_ID(this.album.id)
      this.CLEAR_PAGES()
      this.PREPARE_SINGLES({ page: 1, res: { items: [this.single] } }).then(
        () => {
          this.SET_PLAYING_INDEX(0)
        }
      )
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

.album-relateds-wrapper
  &__header
    margin 0 17px
  &__track-list
    margin 20px 0 0 0 !important
</style>
