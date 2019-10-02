<template>
  <section class="home">
    <!-- <section class="home__slideshow slideshow"></section> -->
    <Slider
      class="home__slideshow"
      :items="audioPromotions.items"
      @clickSlide="handleClickSlide"
    />
    <section class="home__showcase showcase">
      <main class="showcase__main main">
        <header class="showcase-header">
          <nuxt-link
            class="showcase-header__title"
            :to="`/section/${getName(sectionMain)}`"
            @click.native="handleClickSectionTitle"
            v-text="getTitle(sectionMain)"
          />
          <nuxt-link
            class="showcase-header__more"
            :to="`/section/${getName(sectionMain)}`"
            @click.native="handleClickSectionMore"
          >
            更多
          </nuxt-link>
        </header>
        <ol class="showcase-list">
          <li
            v-for="album in sectionMainShowcaseAlbums"
            :key="album.id"
            class="showcase-list__list-item"
            @click="handleClickShowcaseListItem"
          >
            <nuxt-link
              :to="`/album/${getName(album)}`"
            >
              <img
                v-lazy="getImgUrl(album)"
                alt=""
              >
              <div>
                <h1 v-text="getTitle(album)" />
                <p v-text="getVocal(album)" />
              </div>
            </nuxt-link>
          </li>
        </ol>
      </main>
      <aside class="showcase__aside aside">
        <header class="showcase-header">
          <nuxt-link
            class="showcase-header__title"
            :to="`/section/${getName(sectionAside)}`"
            @click.native="handleClickSectionTitle"
            v-text="getTitle(sectionAside)"
          />
          <nuxt-link
            class="showcase-header__more"
            :to="`/section/${getName(sectionAside)}`"
            @click.native="handleClickSectionMore"
          >
            更多
          </nuxt-link>
        </header>
        <ol class="showcase-list">
          <li
            v-for="album in sectionAsideShowcaseAlbums"
            :key="album.id"
            class="showcase-list__list-item"
            @click="handleClickShowcaseListItem"
          >
            <nuxt-link
              :to="`/album/${getName(album)}`"
            >
              <img
                v-lazy="getImgUrl(album)"
                alt=""
              >
              <div>
                <h1 v-text="getTitle(album)" />
                <p v-text="getVocal(album)" />
              </div>
            </nuxt-link>
          </li>
        </ol>
      </aside>
    </section>
  </section>
</template>

<script>
import _ from 'lodash'

import Slider from '~/components/Slider/Slider.vue'

export default {
  components: {
    Slider
  },
  computed: {
    sectionMain() {
      return _.get(this.sections, 0, {})
    },
    sectionMainShowcaseAlbums() {
      return this.getSectionAlbums(this.getName(this.sectionMain))
    },
    sectionAside() {
      return _.get(this.sections, 1, {})
    },
    sectionAsideShowcaseAlbums() {
      return _.take(this.getSectionAlbums(this.getName(this.sectionAside)), 4)
    }
  },
  async asyncData({ app }) {
    const fetchAudioPromotions = () => {
      return app.$fetchAudioPromotions()
    }

    /*
    ** 1. Fetch all sections
    ** 2. Fetch albums belong to each audio sections
    */
    const getAudioSectionsAndAlbums = async () => {
      const getSectionAlbums = async sectionIds => {
        // requests in parallel
        const result = await Promise.all(
          sectionIds.map(id =>
            app.$fetchAlbums({
              max_results: app.$MAXRESULT_SHOWCASE_HOME,
              page: 1,
              sort: 'sortOrder',
              where: {
                sections: {
                  $in: [id]
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
          )
        )
        return result.map(d => d.items)
      }

      const { items } = await app.$fetchSections({ max_results: 20 })
      const audioSections = items
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

    handleClickShowcaseListItem() {
      this.$sendGAHome({ action: 'click', label: 'album' })
    },
    handleClickSlide() {
      this.$sendGAHome({ action: 'click', label: 'slideshow' })
    },
    handleClickSectionTitle() {
      this.$sendGAHome({ action: 'click', label: 'section' })
    },
    handleClickSectionMore() {
      this.$sendGAHome({ action: 'click', label: 'section more' })
    },

    getName(item) {
      return _.get(item, 'name', '')
    },
    getTitle(item) {
      return _.truncate(_.get(item, 'title', ''), { length: 15 })
    },
    getImgUrl(item) {
      return _.get(this.$getImgs(item), ['mobile', 'url'], '')
    },
    getVocal(item) {
      return _.get(item, ['vocals', 0, 'name'], '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  &__showcase
    margin-top 30px

.showcase
  min-height 675px
  max-width 1200px
  margin-left auto
  margin-right auto
  display flex
  &__aside
    margin 0 0 0 40px

.main
  width 770px

.aside
  width 390px

.showcase-header
  height 30px
  border-bottom 3px solid #EFEFEF
  padding 0 18px
  display flex
  justify-content space-between
  &__title
    font-size 18px
    font-weight bold
    color #1E170F
    margin 0
    border-bottom 3px solid #FE5000
    height 30px
    display inline-block
    padding 0 5px
  &__more
    display flex
    align-items center
    font-size 13px
    color #1E170F
    margin 0 0 5px 0
    &:before
      content ''
      width 0
      height 0
      border-style solid
      border-width 4px 0 4px 7px
      border-color transparent transparent transparent #FE5000
      margin 0 5px 0 0

.showcase-list
  list-style none
  margin -2px 3px // margin calc(18px - 20px) calc(18px - 15px)
  padding 0
  display flex
  flex-wrap wrap
  &__list-item
    margin 20px 15px
    img
      d = 160px
      width d
      height d
      min-width d
      min-height d
      object-fit cover
    div
      text-align center
      margin 10px 0 0 0
    h1
      margin 0
      font-size 16px
      color #2E2526
    p
      margin 10px 0 0 0
      font-size 13px
      color #6F6F6F

@media (max-width 768px)
  .showcase
    min-height 0
    max-width 100%
    margin-left 0
    margin-right 0
    flex-direction column
    &__aside
      margin 40px 0 20px 0

  .main
    width 100%

  .aside
    width 100%

  .showcase-header
    &__title
      font-size 16px
    
  .showcase-list
    margin 8px -2px // margin calc(18px - 10px) calc(18px - 20px)
    &__list-item
      margin 10px 20px
      img
        d = calc((100vw - 18px * 2 - 40px) / 2)
        width d
        height d
        min-width d
        min-height d
      h1
        font-size 15px
</style>
