<template>
  <AppDiv class="slideshow">
    <DivHeader
      class="slideshow__header"
    >
      <template slot="left">
        收錄於
      </template>
      <SwitchArrow
        v-if="albums.length > 1"
        slot="right"
        class="slideshow-switchers"
        @clickLeft="onClickLeft"
        @clickRight="onClickRight"
      />
    </DivHeader>
    <div class="slideshow__content content">
      <div
        v-for="albumId in albums"
        :key="albumId"
        class="content__slide slide"
        :style="{
          transform: `translate(${currentSlideIndex * -100}%)`,
          height: albumId === albums[currentSlideIndex] ? 'auto' : '0px'
        }"
      >
        <div
          v-show="isLoading"
          class="slide__loading"
        />
        <div v-show="!isLoading">
          <AsideIntroAlbum
            class="slide__album"
            :data="getAlbum(albumId)"
            @clickFigure="linkToAlbum"
          />
          <AsideTrackList
            class="slide__tracks"
            :album="getAlbum(albumId)"
            :tracks="getTracks(albumId)"
            @playTrack="playTrack"
            @clickAlbum="clickAlbum"
            @clickAlbumMore="clickAlbumMore"
            @clickLink="$emit('clickLink')"
          />
        </div>
      </div>
    </div>
  </AppDiv>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import _ from 'lodash'

import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import SwitchArrow from '~/components/Button/SwitchArrow.vue'
import AsideIntroAlbum from '~/components/Aside/AsideIntro/AsideIntroAlbum/Container.vue'
import AsideTrackList from '~/components/Aside/AsideTrackList/Container.vue'

const fetchTracks = (app, albumId, isLatestFirst = true, page = 1) => {
  return app.$fetchSingle({
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
    AppDiv,
    DivHeader,
    SwitchArrow,
    AsideIntroAlbum,
    AsideTrackList
  },
  props: {
    albums: {
      type: Array,
      default() {
        return []
      }
    },
    album: {
      type: Object,
      default() {
        return {}
      }
    },
    tracks: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      currentSlideIndex: 0,
      slideData: this.initSlideData(),
      isLoading: false
    }
  },
  computed: {
    slideAlbumId() {
      return this.albums[this.currentSlideIndex]
    },
    slideDataAlbum() {
      return _.get(this.slideData, [this.slideAlbumId, 'album'], {})
    },
    slideDataTracks() {
      return _.get(this.slideData, [this.slideAlbumId, 'tracks'], {})
    },
    shouldFetch() {
      return _.isEmpty(_.get(this.slideData, [this.slideAlbumId, 'album'], {}))
    }
  },
  watch: {
    currentSlideIndex() {
      if (this.shouldFetch) {
        this.fetch()
      }
    }
  },
  methods: {
    initSlideData() {
      const object = {}
      this.albums.forEach((albumId, i) => {
        if (i === 0) {
          object[albumId] = { album: this.album, tracks: this.tracks }
        } else {
          object[albumId] = { album: {}, tracks: {} }
        }
      })
      return object
    },
    onClickLeft() {
      if (this.currentSlideIndex === 0) {
        this.currentSlideIndex = this.albums.length - 1
        return
      }
      this.currentSlideIndex = this.currentSlideIndex - 1
    },
    onClickRight() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.albums.length
    },

    async fetch() {
      this.isLoading = true
      const albumId = _.get(this.albums, this.currentSlideIndex, '')
      const albums = await this.$fetchAlbums({
        where: {
          _id: {
            $in: [albumId]
          }
        }
      })
      const album = _.get(albums, ['items', 0], {})
      const tracks = await fetchTracks(this, albumId)

      this.slideData[albumId].album = album
      this.slideData[albumId].tracks = tracks
      this.isLoading = false
    },
    getAlbum(albumId) {
      return _.get(this.slideData, [albumId, 'album'], {})
    },
    getTracks(albumId) {
      return _.get(this.slideData, [albumId, 'tracks'], {})
    },

    linkToAlbum() {
      this.$sendGASingle({ action: 'click', label: 'album page' })

      const albumName = _.get(this.slideDataAlbum, 'name', '')
      this.$router.push(`/album/${albumName}`)
    },
    clickAlbum() {
      this.$sendGASingle({
        action: 'click',
        label: 'album bottom'
      })
    },
    clickAlbumMore() {
      this.$sendGASingle({
        action: 'click',
        label: 'album bottom more'
      })
    },

    ...mapActions({
      RESET_AUDIO_LIST: 'appPlayer/RESET_AUDIO_LIST'
    }),
    ...mapMutations({
      SET_FETCH_PAYLOAD: 'appPlayer/SET_FETCH_PAYLOAD'
    }),
    playTrack(slug) {
      const tracks = this.slideDataTracks
      const items = _.get(tracks, 'items', [])
      const playAt = _.findIndex(items, o => {
        const _slug = _.get(o, 'slug', '')
        return _slug === slug
      })
      this.RESET_AUDIO_LIST({
        list: items.map(item => this.$normalizeSingle(item)),
        albumId: this.slideAlbumId,
        playAt,
        autoPlay: true
      })

      // send links info to appPlayer's store, for load more tracks
      const links = _.get(this.tracks, 'links', {})
      const hrefPrev = _.get(links, ['prev', 'href'], '')
      const hrefNext = _.get(links, ['next', 'href'], '')
      if (hrefPrev !== '') {
        const hrefPrevParsed = this.$toPayloadObject({
          maxResults: 10,
          payloadString: hrefPrev.replace('posts', '')
        })
        this.SET_FETCH_PAYLOAD({ where: 'prev', payload: hrefPrevParsed })
      }
      if (hrefNext !== '') {
        const hrefNextParsed = this.$toPayloadObject({
          maxResults: 10,
          payloadString: hrefNext.replace('posts', '')
        })
        this.SET_FETCH_PAYLOAD({ where: 'next', payload: hrefNextParsed })
      }

      this.$sendGASingle({ action: 'click', label: 'play single' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.slideshow
  padding 18px 8px 8px 8px !important
  &__header
    padding 0 10px
  &__content
    margin 15px 0 0 0

.content
  display flex
  overflow hidden

.slide
  flex 1 0 auto
  width 100%
  transition transform .25s ease-in-out
  &__loading
    height 300px
    background-color white
  &__album
    padding 0 10px
  &__tracks
    margin 31px 0 0 0

@media (max-width 768px)
  .slideshow
    padding 10px 5px 0px 5px !important
    &__header
      padding 0 8px 10px 8px
      border-bottom 1px solid #eee

  .slide
    &__album
      padding 0 8px
</style>
