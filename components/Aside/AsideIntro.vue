<template>
  <AppDiv class="intro-wrapper">
    <AppH1 class="intro-wrapper__title">
      {{ title }}
    </AppH1>
    <div class="intro-wrapper__intro intro">
      <figure
        :class="[ 'intro__info', 'figure', `figure--${imgStyle}`]"
        @click="$emit('clickFigure')"
      >
        <img
          v-if="fig !== ''"
          :key="fig"
          v-lazy="fig"
          :class="[ 'figure__img', `figure__img--${imgStyle}` ]"
          alt=""
        >
        <figcaption class="figure__figcaption">
          {{ figcaption }}
        </figcaption>
      </figure>
      <div class="intro__description" v-html="description" />
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
    },
    fig: {
      type: String,
      required: true
    },
    figcaption: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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
    & >>> p
      font-size 14px
      line-height 1.71
      text-align justify
      color #7d7d7d
    & >>> a
      color #21516f

.figure
  display flex
  &--square
    align-items flex-start
  &--round
    align-items center
  &__img
    display block
    object-fit cover
    margin 0 17px 0 0
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

@media (max-width 768px)
  .intro-wrapper
    padding 17px 5px 13px 5px !important
    border-radius 2px
    &__title
      font-size 15px !important
      padding 0 0 15px 8px
      // border-bottom 2px solid rgba(216, 216, 216, 0.3)
      border-bottom 1px solid #eeeeee
    &__intro
      margin 9px 0 0 0

  .intro
    padding 0 8px
    &__description
      display none

  .figure
    &--square
      align-items center
    &__figcaption
      font-size 15px
</style>
