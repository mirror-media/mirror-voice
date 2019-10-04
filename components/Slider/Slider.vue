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
  computed: {
    href() {
      return _.get()
    }
  },
  methods: {
    getImgUrl(item) {
      return _.get(this.$getImgs(item), ['tablet', 'url'], '')
    },
    getHref(item) {
      return _.get(item, 'href', '/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  height calc(100vw / 1080px * 0.56203) // 607 / 1080 = 0.56203
  padding 0 0 20px 0
  position relative
  &:before
    position absolute
    left 0
    top 0
    height calc(100% - 20px)
    width 300px
    content ''
    background linear-gradient(to left, #FFFFFF00 0%, #6F6F6F 100%)
    pointer-events none
    z-index 999
    opacity .7
  &:after
    position absolute
    right 0
    top 0
    height calc(100% - 20px)
    width 300px
    content ''
    background linear-gradient(to right, #FFFFFF00 0%, #6F6F6F 100%)
    pointer-events none
    z-index 999
    opacity .7

.swiper-slide
  width 33.33%
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

.swiper-button-next
  right 23px
  background-image url('~assets/img/revamp/icon-right-arrow.svg')
  filter brightness(.7)

.swiper-pagination
  bottom 0px
  & >>> [role=button]
    width 8px
    height 8px
    margin 0 10px
  & >>> .swiper-pagination-bullet
    background-color gray
  & >>> .swiper-pagination-bullet-active
    background-color #1E170F

@media (max-width 768px)
  .slider
    height calc(100vw * 0.65)
    padding 0 0 30px 0
    &:before, &:after
      display none

  .swiper-slide
    width 100%

  .swiper-button
    filter none
    opacity .8

  .swiper-button-prev
    left 5px
    transform translateY(-15px)

  .swiper-button-next
    right 5px
    transform translateY(-15px)
</style>
