<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <Slider
        :items="audioPromotions.items"
      />
      <PageNavsHorizontalList
        class="main__navs"
        :items="categories"
        :should-wrap="false"
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
      class="aside"
      :items="sections"
    />
  </AppMainAsideWrapper>
</template>

<script>
import _ from 'lodash'

import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import Slider from '~/components/Slider/Slider.vue'
import PageNavsHorizontalList from '~/components/PageNavs/PageNavsHorizontalList.vue'
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
    PageNavsHorizontalList,
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
    const [audioPromotions, { sections = [], albums = [] }] = await Promise.all(
      [fetchAudioPromotions(), getAudioSectionsAndAlbums()]
    )
    const categories = _.flatten(
      sections.map(section => _.get(section, 'categories', []))
    )
    return {
      audioPromotions,
      sections,
      categories,
      albums
    }
  },
  methods: {
    getSectionAlbums(sectionName) {
      return this.albums.filter(album => {
        const { sections = [] } = album
        return _.findIndex(sections, o => o.name === sectionName) !== -1
      })
    },
    playAlbum(albumId) {
      fetchPlayerTracks(this.$store, albumId)
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  &__navs
    display none !important
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

@media (max-width 768px)
  .main
    &__navs
      display flex !important
      padding 0 0 0 18px !important
    &__wrapper
      margin 16px 0 0 0

  .aside
    display none !important

  .showcase
    border-top 6px solid #d84939
    padding 18px 18px 0 18px !important

  .header
    &__right
      font-size 11px
      color #4a4a4a
      text-decoration underline
</style>
