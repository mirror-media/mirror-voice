<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <Slider
        :items="sliderItems"
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
import { mapState, mapGetters } from 'vuex'
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
  computed: {
    ...mapState({
      sliderItems: state => state.audioPromotions.items,
      showcase: state => state.showcase.items
    }),
    ...mapGetters({
      sections: 'sections/AUDIO_SECTIONS'
    })
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('audioPromotions/FETCH'),
      store.dispatch('sections/FETCH', { max_results: 20 }).then(res => {
        const sectionIds = store.getters['sections/AUDIO_SECTIONS'].map(
          section => section.id
        )
        store.commit('showcase/SET_ITEMS', [])
        return Promise.all(
          sectionIds.map(id => {
            return store.dispatch('showcase/FETCH', {
              mode: 'push',
              max_results: 10,
              page: 1,
              sort: '-publishedDate',
              where: {
                sections: {
                  $in: [id]
                }
              }
            })
          })
        )
      })
    ])
  },
  methods: {
    getSectionAlbums(sectionName) {
      return this.showcase.filter(album => {
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
  &__wrapper
    margin 20px 0 0 0

.showcase
  &__showcase
    margin 24px 0 0 0

.header
  &__right
    font-size 14px
    color #7d7d7d
    cursor pointer
</style>
