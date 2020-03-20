<template>
  <div class="wrapper">
    <div class="wrapper__top top">
      <img
        class="top__oops"
        src="~/assets/img/oops.png"
        alt=""
      >
      <div class="top__description description">
        <p>哎呀，語音檔出現了一點錯誤，</p>
        <p>先聽聽看別的音檔如何？</p>
      </div>
    </div>
    <div class="wrapper__center center">
      <ShowcasePlayingErrorList
        v-if="list.length > 0"
        class="center__list"
        @clickListItem="clickListItem"
      />
    </div>
    <div class="wrapper__bottom bottom">
      <nuxt-link
        class="bottom__button"
        to="/"
        @click.native="SET_SHOW_LIGHTBOX(false)"
      >
        不用了，我要回首頁
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapGetters } from 'vuex'

import ShowcasePlayingErrorList from '~/components/ShowcasePlayingError/List.vue'

export default {
  components: {
    ShowcasePlayingErrorList
  },
  computed: {
    ...mapGetters({
      list: 'appPlayer/LIST'
    })
  },
  methods: {
    ...mapMutations({
      SET_SHOW_LIGHTBOX: 'lightboxPlayingError/SET_SHOW_LIGHTBOX',
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX'
    }),
    clickListItem(item) {
      const slug = _.get(item, 'slug', '')
      const index = _.findIndex(this.list, o => o.slug === slug)
      this.SET_PLAYING_INDEX(index)
      this.SET_SHOW_LIGHTBOX(false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 422px
  display flex
  flex-direction column
  align-items center
  margin 14px 0
  &__bottom
    margin 30px 0 0 0

.top
  display flex
  flex-direction column
  align-items center
  &__oops
    width 170px
  &__description
    margin 30px 0 0 0

.description
  display flex
  flex-direction column
  align-items center
  font-size 18px
  font-weight normal
  font-style normal
  font-stretch normal
  line-height 1.56
  letter-spacing 0.9px
  color #1b1b1b

.center
  &__list
    margin 30px 0 0 0 !important

.bottom
  &__button
    display block
    width 270px
    height 40px
    display flex
    justify-content center
    align-items center
    background-color #d84939
    color white
    font-weight 600
    border-radius 4px

@media (max-width 768px)
  .wrapper
    width 80vw
    margin 20px 0
  
  .bottom
    &__button
      width 200px

@media (max-width 320px)
  .description
    font-size 16px
</style>
