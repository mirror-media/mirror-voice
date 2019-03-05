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
        v-if="total > $MAXRESULT_SHOWCASE_SECTION_CATEGORY"
        class="bottom-wrapper__pagination"
        :total="total"
        :items-per-page="$MAXRESULT_SHOWCASE_SECTION_CATEGORY"
        @pageChange="fetchShowcase"
      />
    </AppDiv>
  </section>
</template>

<script>
import _ from 'lodash'

import AppDiv from '~/components/AppDiv.vue'
import PageNavsHorizontal from '~/components/PageNavs/PageNavsHorizontal.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'
import AppPagination from '~/components/AppPagination.vue'

const getShowcaseParam = (collection, routeName, routeParam) => {
  let where
  let getterName
  if (routeName.includes('section')) {
    where = 'sections'
    getterName = 'audioSections'
  } else if (routeName.includes('category')) {
    where = 'categories'
    getterName = 'audioCategories'
  }

  const data = _.find(collection[getterName], o => o.name === routeParam)
  const ids = [_.get(data, 'id', '')]

  return { where, ids }
}

const fetchShowcase = (app, where, ids, page = 1) => {
  return app.$fetchAlbums({
    max_results: app.$MAXRESULT_SHOWCASE_SECTION_CATEGORY,
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
    total() {
      return this.showcase.meta.total
    },
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
  async asyncData({ app, store, route, error }) {
    const routeName = route.name
    const routeParam = route.params.name

    const { items } = await app.$fetchSections({ max_results: 20 })
    const audioSections = app.$filterAudioSections(items)
    const audioCategories = _.flatten(
      audioSections.map(section => {
        return section.categories.map(category =>
          Object.assign(category, {
            sectionName: section.name,
            sectionTitle: section.title
          })
        )
      })
    )

    // Validate route
    const isNotFound =
      (routeName.includes('section') &&
        _.findIndex(audioSections, o => o.name === routeParam) === -1) ||
      (routeName.includes('category') &&
        _.findIndex(audioCategories, o => o.name === routeParam) === -1)
    if (isNotFound) {
      error({ statusCode: 404, message: 'section/category not found' })
    }

    // Breadcrumb
    const crumbs = []
    if (routeName.includes('section')) {
      const section = _.find(audioSections, o => o.name === routeParam)
      const title = _.get(section, 'title', '')
      const path = route.path

      crumbs.push({ title, path })
    } else if (routeName.includes('category')) {
      const category = _.find(audioCategories, o => o.name === routeParam)
      const titleCategory = _.get(category, 'title', '')
      const pathCategory = route.path
      const titleSection = _.get(category, 'sectionTitle', '')
      const pathSection = `/section/${_.get(category, 'sectionName', '')}`

      crumbs.push(
        { title: titleSection, path: pathSection },
        { title: titleCategory, path: pathCategory }
      )
    }
    store.commit('appBreadcrumb/PUSH', crumbs)

    // The "where" variable should will be: sections or categories
    const { where, ids } = getShowcaseParam(
      { audioSections, audioCategories },
      routeName,
      routeParam
    )
    const showcase = await fetchShowcase(app, where, ids)

    return {
      sections: audioSections,
      categories: audioCategories,
      showcase: showcase
    }
  },
  methods: {
    async fetchShowcase(page) {
      const { where, ids } = getShowcaseParam(
        {
          audioSections: this.sections,
          audioCategories: this.categories
        },
        this.routeName,
        this.routeParam
      )
      const showcase = await fetchShowcase(this, where, ids, page)
      this.$set(this, 'showcase', showcase)
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
    margin 26px 0 0 0 !important
  &__pagination
    margin 75px 0 0 0
</style>
