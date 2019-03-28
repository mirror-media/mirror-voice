<template>
  <div
    :class="[
      'wrapper',
      { 'wrapper--hover': isMouseover }
    ]"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div class="wrapper__cover cover">
      <img
        v-if="coverImgUrl !== ''"
        :key="coverImgUrl"
        v-lazy="coverImgUrl"
        :class="[
          'cover__img',
          { 'cover__img--dimmed': isMouseover }
        ]"
        alt=""
      >
      <img
        :class="[
          'cover__play-icon',
          { 'cover__play-icon--show': isMouseover }
        ]"
        src="~/assets/img/btn_play.png"
        alt=""
      >
    </div>
    <div class="wrapper__info info">
      <nuxt-link :to="to">
        <h1 class="info__title">
          {{ title }}
        </h1>
      </nuxt-link>
      <p class="info__vocal">
        {{ vocal }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coverImgUrl: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: '/'
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    vocal: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isMouseover: false
    }
  },
  methods: {
    onMouseover() {
      this.isMouseover = true
    },
    onMouseout() {
      this.isMouseover = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background-color #eeeeee
  display flex
  cursor pointer
  padding 14px
  width 290px
  height 100px
  &--hover
    background-color #f5f5f5
  &__cover
    d = 70px
    width d
    min-width d
    height d
    min-height d
  &__info
    margin 0 0 0 13px

.cover
  display flex
  justify-content center
  align-items center
  position relative
  &__img
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    object-fit cover
    transition filter .1s ease-out
    &--dimmed
      filter brightness(50%)
  &__play-icon
    d = 40px
    width d
    height d
    z-index 2
    opacity 0
    // transition opacity .1s ease-out
    &--show
      opacity 1
      animation-name bounceIn
      animation-duration 0.5s

.info
  position relative
  display flex
  flex-direction column
  justify-content space-between
  &__title
    font-size 16px
    font-weight 600
    line-height 1.38
    margin 0
    color black
    &:hover
      color #d84939
  &__vocal
    font-size 14px
    line-height 1.29
    color #7d7d7d
    // margin 8px 0 0 0

@media (max-width 768px)
  .wrapper
    width 100%
</style>
