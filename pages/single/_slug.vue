<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv
        class="main__wrapper info-wrapper"
        :padding="'0'"
      >
        <Info
          class="info-wrapper__info"
          :info="single"
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
import { mapState, mapActions, mapMutations } from 'vuex'
import sanitizeHtml from 'sanitize-html'
import _ from 'lodash'

import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import Info from '~/components/Info/Info.vue'
import AsideIntro from '~/components/Aside/AsideIntro.vue'
import AsideTrackList from '~/components/Aside/AsideTrackList.vue'
import NoSSR from 'vue-no-ssr'

const fetchTracks = (store, isLatestFirst = true, page = 1) => {
  const albumId = _.get(store.state.album, ['info', 'id'], '')
  return store.dispatch('tracks/FETCH', {
    max_results: 5,
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
    AsideIntro,
    AsideTrackList,
    NoSSR
  },
  computed: {
    ...mapState({
      single: state => state.single.info,
      album: state => state.album.info,
      tracks: state => state.tracks
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
  fetch({ store, route }) {
    const routeParam = route.params.slug
    return (
      store
        .dispatch('single/FETCH_SINGLE', {
          where: {
            slug: {
              $in: [routeParam]
            }
          }
        })
        .then(() => {
          const single = store.state.single.info
          const albumId = _.get(single, ['albums', 0], '')
          return store.dispatch('album/FETCH_ALBUM', {
            where: {
              _id: {
                $in: [albumId]
              }
            }
          })
        })
        // TODO: could fetch without waiting album fetched
        .then(() => {
          return fetchTracks(store)
        })
    )
  },
  methods: {
    ...mapActions({
      PLAY: 'appPlayer/PLAY'
    }),
    playAlbum(albumId = this.album.id) {
      const albumIdTracks = _.get(this.tracks, 'albumId', '')

      // NOTE: always true in single's page, this may be for refactoring purposes
      // prevent additional request of fetching album's tracks
      if (albumId === albumIdTracks) {
        this.PLAY({
          sounds: this.tracks.items,
          meta: this.tracks.meta,
          links: this.tracks.links,
          albumId
        })
      } else {
        fetchPlayerTracks(this.$store, albumId)
      }
    },

    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX'
    }),
    playTrack(slug) {
      const playingIndex = _.findIndex(this.tracks.items, o => o.slug === slug)
      this.SET_PLAYING_INDEX(playingIndex)
      this.playAlbum()
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

.info-wrapper
  &__info
    padding 25px

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
    margin 20px 0 0 0
</style>
