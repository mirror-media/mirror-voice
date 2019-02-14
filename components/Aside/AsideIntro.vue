<template>
  <AppDiv class="intro-wrapper">
    <AppH1 class="intro-wrapper__title">
      {{ title }}
    </AppH1>
    <div class="intro-wrapper__intro intro">
      <figure class="intro__info figure">
        <img :class="[ 'figure__img', `figure__img--${imgStyle}` ]" src="" alt="">
        <figcaption class="figure__figcaption">
          高難度對話：如何與挑剔的人愉快相處
        </figcaption>
      </figure>
      <div class="intro__description">
        <p>你如果明白什麼事物能激起別人的反應，就能優化自己的行為、互動與人際關係。在沒有架構的情況下試圖和別人愉快相處，有點像是在沒有公式的情況下試圖解答複雜的數學題。這兩種做法不僅都相當困難，也會帶來許多不必要的痛苦。本書會給你學校從來沒教的人際技能。</p>
      </div>
    </div>
  </AppDiv>
</template>

<script>
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'

export default {
  components: {
    AppDiv,
    AppH1
  },
  props: {
    title: {
      type: String,
      required: true
    },
    imgStyle: {
      type: String,
      default: 'square',
      validator(value) {
        return ['square', 'round'].includes(value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro-wrapper
  &__title
    font-size 18px !important
  &__intro
    margin 21px 0 0 0

.intro
  &__description
    margin 18px 0 0 0
    p
      font-size 14px
      line-height 1.71
      text-align justify
      color #7d7d7d

.figure
  display flex
  &__img
    display block
    background-color black
    &--square
      d = 70px
      min-width d
      width d
      min-height d
      height d
    &--round
      d = 44px
      min-width d
      width d
      min-height d
      height d
      border-radius 44px
  &__figcaption
    font-size 16px
    line-height 1.25
    text-align justify
    margin 0 0 0 17px
</style>
