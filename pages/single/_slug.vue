<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv
        class="main__wrapper infos-wrapper"
      >
        <Info
          class="infos-wrapper__info"
          :info="single"
          @clickPlay="playSingle"
        />

        <audio
          ref="audio"
          @durationchange="setSingleDuration"
        />
        <AppPlayingBanner
          class="infos-wrapper__playing-banner"
          :is-playing.sync="isSinglePlaying"
        >
          <template v-if="!isSinglePlaying">
            播放 {{ $secondsToHms(singleDuration) }}
          </template>
          <template v-else>
            暫停 {{ $secondsToHms(appPlayer.playedTime) }} / {{ $secondsToHms(singleDuration) }}
          </template>
        </AppPlayingBanner>
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
          文稿
        </AppH1>
        <!-- NoSSR due to SEO concerns -->
        <NoSSR>
          <div class="body-wrapper__body-tags body-tags">
            <div class="body-tags__body" v-html="content" />
            <div
              v-if="tags.length > 0"
              class="body-tags__tags tags"
            >
              <AppTag
                v-for="(tag, i) in tags"
                :key="i"
                class="tags__tag"
                :tag="tag"
              />
            </div>
          </div>
        </NoSSR>
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
        class="aside__wrapper tracks"
        :album="album"
        :tracks="tracks.items"
        @playTrack="playTrack"
      />
    </div>
  </AppMainAsideWrapper>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import sanitizeHtml from 'sanitize-html'
import _ from 'lodash'

import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import Info from '~/components/Info/Info.vue'
import AppPlayingBanner from '~/components/AppPlayingBanner.vue'
import AppTag from '~/components/AppTag.vue'
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
    AppPlayingBanner,
    AppTag,
    AsideIntro,
    AsideTrackList,
    NoSSR
  },
  data() {
    return {
      isBodyWrapperFold: true,
      singleDuration: 0
    }
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
    },

    ...mapState(['appPlayer']),
    appPlayerSingleSlug() {
      return _.get(this.list, [this.appPlayer.playingIndex, 'slug'], '')
    },
    isSinglePlaying: {
      get() {
        return (
          this.appPlayer.isPlaying &&
          this.appPlayerSingleSlug === _.get(this.single, 'slug', '')
        )
      },
      set(val) {
        if (val) {
          if (this.appPlayerSingleSlug !== _.get(this.single, 'slug', '')) {
            this.playSingle()
          } else {
            // continue
            this.SET_IS_PLAYING(true)
          }
        } else {
          // pause
          this.SET_IS_PLAYING(false)
        }
      }
    },

    // alias of audio element
    audio() {
      return this.$refs.audio
    },

    tags() {
      return _.get(this.single, 'tags', [])
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
  mounted() {
    const id = _.get(this.single, 'id', '')
    this.audio.src = `http://www.mirrormedia.mg/assets/audios/${id}.wav`
  },
  methods: {
    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES',
      SET_IS_PLAYING: 'appPlayer/SET_IS_PLAYING'
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
    },
    setSingleDuration(e) {
      const duration = _.get(e, ['target', 'duration'], 0)
      this.singleDuration = duration
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

.infos-wrapper
  &__playing-banner
      display none

.body-wrapper
  &__body-tags
    margin 17px 0 0 0

.body-tags
  &__body
    color #7d7d7d
    font-size 14px
    line-height 1.71
    text-align justify
    & >>> *
      margin 20px 0 0 0
    & >>> a
      color #21516f
  &__tags
    display none

.album-relateds-wrapper
  &__header
    margin 0 17px
  &__track-list
    margin 20px 0 0 0 !important

@media (max-width 768px)
  .main
    &__wrapper
      margin 13px
      & + &
        margin 13px

  .aside
    &__wrapper
      margin 0 13px 13px 13px
      & + &
        margin 13px
  
  .infos-wrapper
    border-radius 2px
    padding 0 !important
    &__playing-banner
      display flex
    &__info
      padding 13px 22px !important

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
    &__body-tags
      margin 0
    &__read-more
      width 100%
      height 19px
      background-color white
      position absolute
      bottom 0
      left 0

  .body-tags
    &__body
      color black
      font-size 13px
      line-height 1.54
      text-align justify
      & >>> *
        margin 20px 0 0 0
      & >>> *:nth-child(1)
        margin 0
    &__tags
      position relative
      left -5px
      margin 10px 0

  .tags
    display flex
    flex-wrap wrap
    &__tag
      margin 5px

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

  .tracks
    border-radius 2px
    box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.1)
</style>
