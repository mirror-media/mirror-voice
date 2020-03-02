<template>
  <section class="home">
    <AppCategoriesNav
      class="home__categories-nav"
    />
    <Slider
      class="home__slideshow"
      :items="audioPromotions.items"
      @clickSlide="handleClickSlide"
    />
    <div class="home__wrapper">
      <section class="aside-main-wrapper">
        <aside class="aside-main-wrapper__aside">
          <BaseCoverImgList
            :title="$DEFAULT_TITLE_LATEST"
            :link-more="'/category/latest'"
            :list-data="latestPosts"
            @playItem="handlePlayCoverImgListItem"
          />
        </aside>
        <main class="aside-main-wrapper__main">
          <BaseCoverImgList
            :title="$DEFAULT_TITLE_POPULAR"
            :link-more="'/category/popular'"
            :columns="2"
            :list-data="popularVoice"
            class="main__popular"
            @playItem="handlePlayCoverImgListItem"
          />
          <BaseNumberedList
            :title="$DEFAULT_TITLE_AUDIO_CHOICES"
            :list-data="audioChoices"
            class="main__audio-choices"
          />
        </main>
      </section>
      <section class="voice-masters">
        <BasePeopleAudioList
          :title="$DEFAULT_TITLE_VOICE_MASTERS"
          :list-data="voiceMasters"
        />
      </section>
      <section class="categories-showcase">
        <BaseCategoryShowcaseList
          v-for="(category, i) in categoriesShowcase"
          :key="i"
          :title="category.title"
          :list-data="category.albums"
          class="categories-showcase__list"
        />
      </section>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations } from 'vuex'

import AppCategoriesNav from '~/components/AppCategoriesNav.vue'
import Slider from '~/components/Slider/Slider.vue'
import BaseCoverImgList from '~/components/BaseCoverImgList.vue'
import BaseNumberedList from '~/components/BaseNumberedList.vue'
import BasePeopleAudioList from '~/components/BasePeopleAudioList.vue'
import BaseCategoryShowcaseList from '~/components/BaseCategoryShowcaseList.vue'

export default {
  components: {
    AppCategoriesNav,
    Slider,
    BaseCoverImgList,
    BaseNumberedList,
    BasePeopleAudioList,
    BaseCategoryShowcaseList
  },
  data() {
    return {
      limit: {
        // There are more items in our raw json data, limit it manually
        popularVoice: 6
      }
    }
  },
  computed: {
    latestPosts() {
      const data = _.get(this, ['rawDataLatestPosts', 'items'], [])
      return data.map(d => ({
        title: _.get(d, ['albums', 0, 'title'], ''),
        subtitle: _.get(d, 'title', ''),
        cover: _.get(this.$getImgs(d), ['mobile', 'url'], ''),
        link: `/single/${_.get(d, 'slug', '')}`,
        slug: _.get(d, 'slug', ''),
        audio: this.$getSingleSoundSrc(d)
      }))
    },
    popularVoice() {
      let data = _.get(this, ['rawDataPopularVoice', 'items'], [])
      data = _.take(data, this.limit.popularVoice)
      return data.map(d => ({
        title: _.get(d, ['albums', 0], ''),
        subtitle: _.get(d, 'title', ''),
        cover: _.get(d, 'heroImage', ''),
        link: `/single/${_.get(d, 'slug', '')}`,
        slug: _.get(d, 'slug', ''),
        audio: _.get(d, 'audio', '')
      }))
    },
    audioChoices() {
      const data = _.get(this, 'rawDataAudioChoices', [])
      return data.map(d => ({
        title: _.get(d, ['choices', 'title'], ''),
        audio: _.get(d, ['choices', 'audio', 0, 'audio', 'url'], ''),
        link: `/single/${_.get(d, ['choices', 'slug'], '')}`
      }))
    },
    voiceMasters() {
      const data = _.get(this, ['rawDataVoiceMasters'], [])
      return data.map(d => ({
        title: _.get(d, ['masters', 'name'], ''),
        singles: _.get(d, ['posts'], []).map(single => ({
          title: _.get(single, 'title', ''),
          link: `/single/${_.get(single, 'slug', '')}`,
          audio: _.get(single, ['audio', 'audio', 'url'], '')
        }))
      }))
    },
    categoriesShowcase() {
      const data = _.get(this, ['rawDataCategoriesShowcase'], [])
      return data.map(d => ({
        title: _.get(d, 'title', ''),
        albums: _.get(d, 'albums', []).map(album => ({
          title: _.get(album, 'title', ''),
          link: `/album/${_.get(album, 'name', '')}`,
          brief: _.get(album, 'brief', ''),
          cover: _.get(this.$getImgs(album), ['mobile', 'url'], ''),
          singles: _.get(album, 'posts', []).map(single => ({
            title: _.get(single, 'title', ''),
            link: `/single/${_.get(single, 'slug', '')}`,
            audio: _.get(single, ['audio', 'audio', 'url'], '')
          }))
        }))
      }))
    }
  },
  async asyncData({ app }) {
    const [
      { value: audioPromotions },
      { value: rawDataLatestPosts },
      { value: rawDataPopularVoice },
      { value: rawDataVoiceMasters },
      { value: rawDataCategoriesShowcase },
      { value: rawDataAudioChoices }
    ] = await Promise.allSettled([
      // fetchs from cms api
      app.$fetchAudioPromotions(),
      app.$fetchSingle({
        max_results: app.$MAXRESULT_HOME_LATEST_POSTS,
        page: 1,
        sort: '-publishedDate',
        embedded: {
          albums: 1
        }
      }),

      // fetchs from cron generated jsons
      app.$fetchPopularVoice(),
      app.$fetchVoiceMasters(),
      app.$fetchCategoriesShowcase(),
      app.$fetchAudioChoices()
    ])
    return {
      audioPromotions,
      rawDataLatestPosts,
      rawDataPopularVoice,
      rawDataVoiceMasters,
      rawDataCategoriesShowcase,
      rawDataAudioChoices
    }
  },
  methods: {
    handleClickSlide() {
      this.$sendGAHome({ action: 'click', label: 'slideshow' })
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
      const singleItem = {
        cover: _.get(item, 'cover', ''),
        title: _.get(item, 'subtitle', ''),
        src: _.get(item, 'audio', ''),
        slug: _.get(item, 'slug', ''),
        vocals: []
      }
      this.SET_ALBUM_ID('')
      this.SET_ALBUM_COVER('')
      this.CLEAR_PAGES()
      this.PREPARE_SINGLES({ page: 1, res: { items: [singleItem] } }).then(
        () => {
          this.SET_PLAYING_INDEX(0)
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  &__categories-nav
    display none
  &__wrapper
    max-width 1280px
    margin 20px auto 0 auto

.aside-main-wrapper
  display flex
  &__main
    margin 0 0 0 30px

.main
  &__audio-choices
    margin 30px 0 0 0

.voice-masters
  margin 30px 0 0 0

.categories-showcase
  &__list
    margin 30px 0 0 0

@media (max-width 768px)
  .home
    &__categories-nav
      display flex
      margin 5px 0 0 0
    &__wrapper
      max-width 100%
      margin 0

  .aside-main-wrapper
    flex-direction column
    &__main
      margin 10px 0 0 0

  .main
    &__audio-choices
      margin 10px 0 0 0

  .voice-masters
    margin 10px 0 0 0

  .categories-showcase
    &__list
      margin 10px 0 0 0
</style>
