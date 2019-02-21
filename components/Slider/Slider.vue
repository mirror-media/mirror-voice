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
      >
        <nuxt-link to="/album/fake">
          <div class="swper-slide__slide">
            <img
              class="swper-slide__image"
              :src="item.heroImage.image.url"
              alt=""
            >
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" />
  </div>
</template>

<script>
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
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: false,
          clickable: true
        },
        grabCursor: false,
        autoplay: true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  height 335px

.swper-slide
  &__slide
    width 100%
    height 100%
  &__image
    width 100%
    height 100%
    object-fit cover

.swiper-pagination
  bottom 16px
  text-align right
  padding 0 20px 0 0
  & >>> [role=button]
    width 12px
    height 12px
    margin 0 4px
  & >>> .swiper-pagination-bullet
    background-color #7d7d7d
  & >>> .swiper-pagination-bullet-active
    background-color #d84939
</style>
