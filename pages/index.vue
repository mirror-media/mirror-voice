<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <Slider
        :items="audioPromotions.items"
      />
      <template
        v-for="(section, i) in sections"
      >
        <AppDiv
          v-if="getSectionAlbums(section.name).length > 0"
          :key="i"
          class="main__wrapper showcase"
        >
          <DivHeader
            class="showcase__header header"
            :size="'large'"
            :weight="'bold'"
            :align-items="'flex-end'"
          >
            <nuxt-link
              slot="left"
              class="header__left"
              :to="`/section/${section.name}`"
            >
              {{ section.title }}
            </nuxt-link>
            <nuxt-link
              slot="right"
              class="header__right"
              :to="`/section/${section.name}`"
            >
              更多
            </nuxt-link>
          </DivHeader>
          <ShowcaseList
            class="showcase__showcase"
            :list="getSectionAlbums(section.name)"
            @clickItem="playAlbum"
          />
        </AppDiv>
      </template>
    </div>
    <PageNavsVertical
      slot="aside"
      :items="sections"
    />
  </AppMainAsideWrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import _ from 'lodash'

import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import Slider from '~/components/Slider/Slider.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'
import PageNavsVertical from '~/components/PageNavs/PageNavsVertical.vue'

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
    DivHeader,
    Slider,
    ShowcaseList,
    PageNavsVertical
  },
  async asyncData({ app }) {
    const fetchAudioPromotions = () => {
      return app.$fetchAudioPromotions()
    }

    /*
    ** 1. Fetch all sections
    ** 2. Filter audio sections
    ** 3. Fetch albums belong to each audio sections
    */
    const getAudioSectionsAndAlbums = async () => {
      const getSectionAlbums = async sectionIds => {
        // requests in parallel
        const result = await Promise.all(
          sectionIds.map(id =>
            app.$fetchAlbums({
              max_results: app.$MAXRESULT_SHOWCASE_HOME,
              page: 1,
              sort: '-publishedDate',
              where: {
                sections: {
                  $in: [id]
                }
              }
            })
          )
        )
        return result.map(d => d.items)
      }
      const { items } = await app.$fetchSections({ max_results: 20 })
      const audioSections = app.$filterAudioSections(items)
      let albums = await getSectionAlbums(
        audioSections.map(section => section.id)
      )
      albums = _.flatten(albums)
      return { sections: audioSections, albums }
    }

    // Run requests in parallel
    const [audioPromotions, { sections, albums }] = await Promise.all([
      fetchAudioPromotions(),
      getAudioSectionsAndAlbums()
    ])
    return {
      audioPromotions,
      sections,
      albums
    }
  },
  methods: {
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX'
    }),
    getSectionAlbums(sectionName) {
      return this.albums.filter(album => {
        const { sections = [] } = album
        return _.findIndex(sections, o => o.name === sectionName) !== -1
      })
    },
    playAlbum(albumId) {
      fetchPlayerTracks(this.$store, albumId)
      this.SET_PLAYING_INDEX(0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  &__wrapper
    margin 20px 0 0 0

.showcase
  &__showcase
    margin 24px 0 0 0 !important

.header
  &__right
    font-size 14px
    color #7d7d7d
    cursor pointer
</style>
