<template>
  <section
    v-infinite-scroll="loadmore"
    infinite-scroll-disabled="shouldDisableLoadmore"
    class="category"
  >
    <div class="category__list-wrapper list-wrapper">
      <header class="list-wrapper__header header">
        <h1
          class="header__title"
          v-text="currentCategoryTitle"
        />
        <BaseTextWithArrow
          :text="'回上頁'"
          :arrow-at="'left'"
          class="header__back"
          @click.native="$router.back()"
        />
      </header>
      <BaseCoverImgList
        :show-header="false"
        :show-storage-info="isCurrentCategoryExtra"
        :columns="3"
        :list-data="listData"
        class="list-wrapper__list"
        @playItem="handlePlayCoverImgListItem"
      />
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'

import BaseTextWithArrow from '~/components/BaseTextWithArrow.vue'
import BaseCoverImgList from '~/components/BaseCoverImgList.vue'

if (process.browser) {
  const infiniteScroll = require('vue-infinite-scroll')
  Vue.use(infiniteScroll)
}

const extraCategories = ['latest', 'popular']

const fetchSingleLatest = (app, { page = 1 } = {}) => {
  return app.$fetchSingle({
    max_results: app.$MAXRESULT_SHOWCASE_CATEGORY,
    page,
    sort: '-publishedDate',
    embedded: {
      albums: 1
    }
  })
}
const fetchAlbums = (app, { ids = [], page = 1 } = {}) => {
  return app.$fetchAlbums({
    max_results: app.$MAXRESULT_SHOWCASE_CATEGORY,
    page,
    sort: 'sortOrder',
    where: {
      categories: {
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

export default {
  components: {
    BaseTextWithArrow,
    BaseCoverImgList
  },
  data() {
    return {
      isLoadingLoadmore: false
    }
  },
  computed: {
    currentCategoryName() {
      return _.get(this.$route, ['params', 'name'], '')
    },
    isCurrentCategoryExtra() {
      return extraCategories.includes(this.currentCategoryName)
    },
    currentCategoryTitle() {
      const mapping = {
        latest: this.$DEFAULT_TITLE_LATEST,
        popular: this.$DEFAULT_TITLE_POPULAR,
        default: _.get(
          _.find(
            _.get(this.$store, ['state', 'categories'], []),
            o => o.name === this.currentCategoryName
          ),
          'title',
          ''
        )
      }
      return _.get(mapping, this.currentCategoryName, mapping.default)
    },

    ...mapState({
      localStorageTrackHistory: state =>
        state.localStorageTrackHistory.trackHistory
    }),
    listData() {
      const rawData = _.get(this.showcaseData, 'items', [])
      const mapping = {
        latest: d => ({
          title: _.get(d, ['albums', 0, 'title'], ''),
          subtitle: _.get(d, 'title', ''),
          cover: _.get(this.$getImgs(d), ['mobile', 'url'], ''),
          link: `/single/${_.get(d, 'slug', '')}`,
          slug: _.get(d, 'slug', ''),
          audio: this.$getSingleSoundSrc(d),
          remainingDuration: _.get(
            this.findTrackMetaInHistory(_.get(d, 'slug', '')),
            'remaining',
            -1
          ),
          memorizedDate: _.get(
            this.findTrackMetaInHistory(_.get(d, 'slug', '')),
            'memorizedDate',
            ''
          )
        }),
        popular: d => ({
          title: _.get(d, ['albums', 0], ''),
          subtitle: _.get(d, 'title', ''),
          cover: _.get(d, 'heroImage', ''),
          link: `/single/${_.get(d, 'slug', '')}`,
          slug: _.get(d, 'slug', ''),
          audio: _.get(d, 'audio', ''),
          remainingDuration: _.get(
            this.findTrackMetaInHistory(_.get(d, 'slug', '')),
            'remaining',
            -1
          ),
          memorizedDate: _.get(
            this.findTrackMetaInHistory(_.get(d, 'slug', '')),
            'memorizedDate',
            ''
          )
        }),
        default: d => ({
          title: _.get(d, ['albums', 0, 'title'], ''),
          subtitle: _.get(d, 'title', ''),
          cover: _.get(this.$getImgs(d), ['mobile', 'url'], ''),
          link: `/album/${_.get(d, 'name', '')}`,
          id: _.get(d, 'id', '')
        })
      }
      return rawData.map(
        _.get(mapping, this.currentCategoryName, mapping.default)
      )
    },
    haveNextPageShowcase() {
      return 'next' in _.get(this.showcaseData, 'links', {})
    },
    shouldDisableLoadmore() {
      return (
        this.isLoadingLoadmore ||
        !this.haveNextPageShowcase ||
        this.currentCategoryName === 'popular'
      )
    }
  },
  async asyncData({ app, store, route, error }) {
    const currentCategoryName = _.get(route, ['params', 'name'], '')
    const isCurrentCategoryExtra = extraCategories.includes(currentCategoryName)

    if (isCurrentCategoryExtra) {
      const extraCategoriesFetchFunctions = {
        latest: () => fetchSingleLatest(app),
        popular: app.$fetchPopularVoice
      }
      const fetchFunction = _.get(
        extraCategoriesFetchFunctions,
        currentCategoryName,
        null
      )

      if (!fetchFunction) {
        error({
          statusCode: 500,
          message: `fetchFunction of ${currentCategoryName} page is null`
        })
      }

      const showcaseData = await fetchFunction()
      return {
        showcaseData
      }
    } else {
      const audioCategories = _.get(store, ['state', 'categories'], [])
      const currentCategoryData = _.find(
        audioCategories,
        o => o.name === currentCategoryName
      )

      const isCurrentCategoryNameInvalid = currentCategoryData === undefined
      if (isCurrentCategoryNameInvalid) {
        error({
          statusCode: 404,
          message: 'category is not belong to audio section'
        })
      }

      const currentCategoryId = _.get(currentCategoryData, 'id', '')
      const showcaseData = await fetchAlbums(app, { ids: [currentCategoryId] })

      return {
        currentCategoryId,
        showcaseData
      }
    }
  },
  methods: {
    async loadmore() {
      const page = _.get(this.showcaseData, ['meta', 'page'])
      const fetchFunctions = {
        latest: () => fetchSingleLatest(this, { page: page + 1 }),
        default: () =>
          fetchAlbums(this, { ids: [this.currentCategoryId], page: page + 1 })
      }
      const fetchFunction = _.get(
        fetchFunctions,
        this.currentCategoryName,
        fetchFunctions.default
      )

      if (page) {
        this.isLoadingLoadmore = true

        const showcase = await fetchFunction()
        const { items = [], links = {}, meta = {} } = showcase
        this.showcaseData.items.push(...items)
        this.$set(this.showcaseData, 'links', links)
        this.$set(this.showcaseData, 'meta', meta)

        this.isLoadingLoadmore = false
      }
    },

    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      SET_ALBUM_COVER: 'appPlayer/SET_ALBUM_COVER',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES'
    }),
    handlePlayCoverImgListItem(item) {
      if (this.isCurrentCategoryExtra) {
        const singleItem = {
          cover: _.get(item, 'cover', ''),
          title: _.get(item, 'subtitle', ''),
          src: _.get(item, 'audio', ''),
          slug: _.get(item, 'slug', ''),
          vocals: _.get(item, 'vocals', [])
        }
        this.SET_ALBUM_ID('')
        this.SET_ALBUM_COVER('')
        this.CLEAR_PAGES()
        this.PREPARE_SINGLES({ page: 1, res: { items: [singleItem] } }).then(
          () => {
            this.SET_PLAYING_INDEX(0)
          }
        )
      } else {
        const albumId = _.get(item, 'id', '')
        this.$store.dispatch('appPlayer/FETCH', {
          max_results: 10,
          page: 1,
          sort: 'publishedDate',
          where: {
            albums: {
              $in: [albumId]
            }
          }
        })
      }
    },

    findTrackMetaInHistory(slug) {
      const trackInLocalStorageTrackHistory = _.find(
        this.localStorageTrackHistory,
        o => {
          const _slug = _.get(o, ['lastTrackStorage', 'slug'], '')
          return _slug === slug
        }
      )
      if (trackInLocalStorageTrackHistory) {
        const duration = _.get(
          trackInLocalStorageTrackHistory,
          'lastTrackDurationTime',
          0
        )
        const playedTime = _.get(
          trackInLocalStorageTrackHistory,
          'lastTrackPlayedTime',
          0
        )
        const memorizedDate = _.get(
          trackInLocalStorageTrackHistory,
          ['lastTrackStorage', 'memorizedDate'],
          ''
        )
        const remaining = duration - playedTime
        return {
          remaining,
          memorizedDate
        }
      } else {
        return {
          remaining: -1,
          memorizedDate: ''
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.category
  max-width 1280px
  margin 0 auto

.list-wrapper
  &__list
    margin 17.5px 0 0 0

.header
  display flex
  justify-content space-between
  align-items baseline
  &__title
    font-size 24px
    font-weight normal
    color #FE5000
    padding 3.5px 0 3.5px 6.5px
    border-left 3px solid #FE5000
    margin 0
  &__back
    cursor pointer

@media (max-width 768px)
  .list-wrapper
    &__list
      margin 12px 0 0 0

  .header
    justify-content center
    &__title
      font-size 15px
      font-weight bold
      color black
      padding 0
      border none
      margin 12px 0 0 0
    &__back
      display none
</style>
