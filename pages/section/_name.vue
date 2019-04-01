<template>
  <section class="section">
    <AppDiv class="section__wrapper top-wrapper">
      <PageNavsHorizontal
        :sections="sections"
        :categories="categories"
        @clickSection="clickSection"
        @clickCategory="clickCategory"
      />
    </AppDiv>
    <AppDiv
      v-infinite-scroll="loadmore"
      infinite-scroll-disabled="shouldDisableLoadmore"
      class="section__wrapper bottom-wrapper"
    >
      <DivHeader class="bottom-wrapper__header-desktop">
        <template slot="left">
          {{ showcaseTitle }}
        </template>
        <template slot="right">
          共 {{ total }} 筆
        </template>
      </DivHeader>
      <div class="bottom-wrapper__header-mobile">
        共 {{ total }} 筆
      </div>
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
import { mapState, mapMutations } from 'vuex'

import AppDiv from '~/components/AppDiv.vue'
import PageNavsHorizontal from '~/components/PageNavs/PageNavsHorizontal.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'
import AppPagination from '~/components/AppPagination.vue'

import Vue from 'vue'
if (process.browser) {
  const infiniteScroll = require('vue-infinite-scroll')
  Vue.use(infiniteScroll)
}

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
      },
      // Filter out albums of empty vocals, which imply empty posts
      vocals: {
        $exists: true,
        $not: {
          $size: 0
        }
      }
    }
  })
}

const fetchPlayerTracks = (app, albumId, isLatestFirst = true, page = 1) => {
  return app.$store.dispatch('appPlayer/FETCH', {
    max_results: app.$MAXRESULT_TRACKS_HOME,
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
  head() {
    return this.$constructMeta({
      title: this.showcaseTitle,
      description: this.routeData.ogDescription,
      'og:url': this.$route.path
    })
  },
  data() {
    return {
      loadingLoadmore: false
    }
  },
  computed: {
    ...mapState({
      isDesktop: state => _.get(state, ['appUA', 'ua', 'isDesktop'], true)
    }),
    haveNextPageShowcase() {
      return 'next' in _.get(this.showcase, 'links', {})
    },
    shouldDisableLoadmore() {
      return (
        this.isDesktop || (this.loadingLoadmore || !this.haveNextPageShowcase)
      )
    },

    total() {
      return this.showcase.meta.total
    },
    routeName() {
      return this.$route.name
    },
    routeParam() {
      return this.$route.params.name
    },
    routeData() {
      let data
      if (this.routeName.includes('section')) {
        data = this.sections
      } else if (this.routeName.includes('category')) {
        data = this.categories
      }

      return _.find(data, o => o.name === this.routeParam)
    },
    showcaseTitle() {
      return _.get(this.routeData, 'title', '')
    }
  },
  async asyncData({ app, store, route, error }) {
    const routeName = route.name
    const routeParam = route.params.name

    const { items } = await app.$fetchSections({ max_results: 20 })

    // NOTE: workaround for audio sections
    // const audioSections = app.$filterAudioSections(items)
    const audioSections = items
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

    // // Breadcrumb
    // const crumbs = []
    // if (routeName.includes('section')) {
    //   const section = _.find(audioSections, o => o.name === routeParam)
    //   const title = _.get(section, 'title', '')
    //   const path = route.path

    //   crumbs.push({ title, path })
    // } else if (routeName.includes('category')) {
    //   const category = _.find(audioCategories, o => o.name === routeParam)
    //   const titleCategory = _.get(category, 'title', '')
    //   const pathCategory = route.path
    //   const titleSection = _.get(category, 'sectionTitle', '')
    //   const pathSection = `/section/${_.get(category, 'sectionName', '')}`

    //   crumbs.push(
    //     { title: titleSection, path: pathSection },
    //     { title: titleCategory, path: pathCategory }
    //   )
    // }
    // store.commit('appBreadcrumb/PUSH', crumbs)

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
    async fetchShowcase(page, shouldPush = false) {
      const { where, ids } = getShowcaseParam(
        {
          audioSections: this.sections,
          audioCategories: this.categories
        },
        this.routeName,
        this.routeParam
      )
      const showcase = await fetchShowcase(this, where, ids, page)

      if (shouldPush) {
        const { items = [], links = {}, meta = {} } = showcase
        this.showcase.items.push(...items)
        this.$set(this.showcase, 'links', links)
        this.$set(this.showcase, 'meta', meta)
      } else {
        this.$set(this, 'showcase', showcase)
      }
    },

    ...mapMutations({
      SET_ALBUM_COVER: 'appPlayer/SET_ALBUM_COVER'
    }),
    playAlbum(album) {
      // TODO: rewrite this workaround for albumCover
      const albumId = _.get(album, 'id', '')
      const albumCover = _.get(this.$getImgs(album), ['mobile', 'url'], '')
      this.SET_ALBUM_COVER(albumCover)
      fetchPlayerTracks(this, albumId)
      this.$sendGAListing({ action: 'click', label: 'album' })
    },

    loadmore() {
      const page = _.get(this.showcase, ['meta', 'page'])
      if (page) {
        this.loadingLoadmore = true
        this.fetchShowcase(page + 1, true).then(() => {
          this.loadingLoadmore = false
        })
      }
    },

    clickCategory() {
      this.$sendGAListing({ action: 'click', label: 'category' })
    },
    clickSection() {
      this.$sendGAListing({ action: 'click', label: 'section' })
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
  &__header-desktop
    display flex
  &__header-mobile
    display none
  &__showcase
    margin 26px 0 0 0 !important
  &__pagination
    margin 75px 0 0 0

@media (max-width 768px)
  .section
    max-width 100%
    margin 0

  .top-wrapper
    padding 0 !important
    background-color transparent !important

  .bottom-wrapper
    background-color transparent !important
    padding 0 13px !important
    &__header-desktop
      display none !important
    &__header-mobile
      display block
      font-size 11px
      color #7d7d7d
    &__showcase
      margin 5px 0 0 0 !important
    &__pagination
      display none !important
</style>
