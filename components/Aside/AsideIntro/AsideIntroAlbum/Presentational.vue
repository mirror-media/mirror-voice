<template>
  <div class="intro">
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
    <div
      v-if="!isDescriptionEmpty"
      class="intro__description"
      v-html="description"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
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
  },
  computed: {
    isDescriptionEmpty() {
      return _.isEmpty(this.description)
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro
  &__description
    margin 18px 0 0 0
    color #7d7d7d
    font-size 14px
    line-height 1.71
    text-align justify
    & >>> *
      margin 20px 0 0 0
    & >>> a
      color #21516f

.figure
  display flex
  cursor pointer
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
