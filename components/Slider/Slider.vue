<template>
  <div
    v-swiper:mySwiper="swiperOption"
    class="slider"
  >
    <div class="swiper-wrapper">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="swiper-slide"
        @click="$emit('clickSlide')"
      >
        <nuxt-link :to="getHref(item)">
          <div class="swiper-slide__slide">
            <img
              class="swiper-slide__image"
              :src="getImgUrl(item)"
              alt=""
            >
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="swiper-button swiper-button-prev" />
    <div class="swiper-button swiper-button-next" />
    <div class="swiper-pagination swiper-pagination-bullets" />
  </div>
</template>

<script>
import _ from 'lodash'

// use plugin at component level rather than app level,
// prevent big swiper.js chunk included in vendor.app.js
import Vue from 'vue'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
      require: true
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: false,
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        grabCursor: false,
        autoplay: true
      }
    }
  },
  methods: {
    getImgUrl(item) {
      return _.get(this.$getImgs(item), ['source', 'url'], '')
    },
    getHref(item) {
      return _.get(item, 'href', '/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  // height calc(100vw / 1080 * 0.56203 * 1px) // 607 / 1080 = 0.56203
  padding 0
  position relative

.swiper-slide
  width 33.33%
  margin 0 5.57px
  &__slide
    width 100%
    height 100%
  &__image
    width 100%
    height 100%
    object-fit contain
    object-position 0 0

.swiper-button
  position absolute
  z-index 1000
  filter brightness(.7)

.swiper-button-prev
  left 23px
  background-image url('~assets/img/revamp/icon-left-arrow.svg')
  filter brightness(1)

.swiper-button-next
  right 23px
  background-image url('~assets/img/revamp/icon-right-arrow.svg')
  filter brightness(1)

.swiper-pagination
  bottom 10px
  & >>> [role=button]
    width 8px
    height 8px
    margin 0 10px
  & >>> .swiper-pagination-bullet
    background-color white
    opacity 1
  & >>> .swiper-pagination-bullet-active
    background-color #1E170F

@media (max-width 768px)
  .swiper-slide
    width 100%

  .swiper-button
    filter none
    opacity .8

  .swiper-button-prev
    left 5px
    opacity 0.6

  .swiper-button-next
    right 5px
    opacity 0.6
</style>
