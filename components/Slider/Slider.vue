<template>
  <div
    v-swiper:mySwiper="swiperOption"
    class="slider"
  >
    <div class="swiper-wrapper">
      <div
        v-for="(banner, i) in banners"
        :key="i"
        class="swiper-slide"
      >
        <nuxt-link to="/album/fake">
          <div
            class="swper-slide__slide"
            :style="{ backgroundColor: banner }"
          />
        </nuxt-link>
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: ['#7f0000', '#004000', '#00007f'],
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
        on: {
          // slideChange() {
          //   console.log('onSlideChangeEnd', this)
          // },
          // tap() {
          //   console.log('onTap', this)
          // }
        },
        grabCursor: false,
        autoplay: true
      }
    }
  },
  mounted() {
    // console.log('app init', this)
    // setTimeout(() => {
    //   this.banners.push('/5.jpg')
    //   console.log('banners update')
    // }, 3000)
    // console.log(
    //   'This is current swiper instance object',
    //   this.mySwiper,
    //   'I will slideTo banners 3'
    // )
    // this.mySwiper.slideTo(3)
  }
}
</script>

<style lang="stylus" scoped>
.slider
  height 335px
  // background-color black

.swper-slide
  &__slide
    width 100%
    height 100%

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
