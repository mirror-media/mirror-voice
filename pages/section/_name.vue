<template>
  <section class="section">
    <AppDiv class="section__wrapper top-wrapper">
      <PageNavsHorizontal
        :sections="sections"
        :categories="categories"
      />
    </AppDiv>
    <AppDiv class="section__wrapper bottom-wrapper">
      <DivHeader>
        <template slot="left">
          {{ showcaseTitle }}
        </template>
        <template slot="right">
          共 {{ total }} 筆
        </template>
      </DivHeader>
      <ShowcaseList
        class="bottom-wrapper__showcase"
        :list-item-layout="'horizontal'"
        :list="showcase.items"
        @clickItem="playAlbum"
      />
      <AppPagination
        v-if="18 < total"
        class="bottom-wrapper__pagination"
        :total="total"
        :items-per-page="18"
        @pageChange="fetchShowcase"
      />
    </AppDiv>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

import AppDiv from '~/components/AppDiv.vue'
import PageNavsHorizontal from '~/components/PageNavs/PageNavsHorizontal.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'
import AppPagination from '~/components/AppPagination.vue'

const getShowcaseParam = (store, routeName, routeParam) => {
  let where
  let getterName
  if (routeName.includes('section')) {
    where = 'sections'
    getterName = 'AUDIO_SECTIONS'
  } else if (routeName.includes('category')) {
    where = 'categories'
    getterName = 'AUDIO_SECTIONS_CATEGORIES'
  }

  const data = _.find(
    store.getters[`sections/${getterName}`],
    o => o.name === routeParam
  )
  const ids = [_.get(data, 'id', '')]

  return { where, ids }
}

const fetchShowcase = (store, where, ids, page = 1) => {
  return store.dispatch('showcase/FETCH', {
    max_results: 18,
    page,
    sort: '-publishedDate',
    where: {
      [where]: {
        $in: ids
      }
    }
  })
}

const fetchPlayerTracks = (store, albumId, isLatestFirst = true, page = 1) => {
  return store.dispatch('appPlayer/FETCH', {
    max_results: 50,
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
    PageNavsHorizontal,
    DivHeader,
    ShowcaseList,
    AppPagination
  },
  computed: {
    ...mapState({
      showcase: state => state.showcase
    }),
    total() {
      return this.showcase.meta.total
    },
    ...mapGetters({
      sections: 'sections/AUDIO_SECTIONS',
      categories: 'sections/AUDIO_SECTIONS_CATEGORIES'
    }),

    routeName() {
      return this.$route.name
    },
    routeParam() {
      return this.$route.params.name
    },
    showcaseTitle() {
      let data
      if (this.routeName.includes('section')) {
        data = this.sections
      } else if (this.routeName.includes('category')) {
        data = this.categories
      }
      return _.get(_.find(data, o => o.name === this.routeParam), 'title', '')
    }
  },
  fetch({ store, route }) {
    const routeName = route.name
    const routeParam = route.params.name

    return store.dispatch('sections/FETCH', { max_results: 20 }).then(() => {
      // The "where" variable should will be: sections or categories
      const { where, ids } = getShowcaseParam(store, routeName, routeParam)
      return fetchShowcase(store, where, ids)
    })
  },
  methods: {
    fetchShowcase(page) {
      const { where, ids } = getShowcaseParam(
        this.$store,
        this.routeName,
        this.routeParam
      )
      return fetchShowcase(this.$store, where, ids, page)
    },
    playAlbum(albumId) {
      fetchPlayerTracks(this.$store, albumId)
    }
  }
}
</script>

<style lang="stylus" scoped>
.section
  max-width 1000px
  margin 0 auto
  &__wrapper
    & + &
      margin 18px 0 0 0

.bottom-wrapper
  &__showcase
    margin 26px 0 0 0
  &__pagination
    margin 75px 0 0 0
</style>
