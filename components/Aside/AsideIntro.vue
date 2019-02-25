<template>
  <AppDiv class="intro-wrapper">
    <AppH1 class="intro-wrapper__title">
      {{ title }}
    </AppH1>
    <div class="intro-wrapper__intro intro">
      <figure class="intro__info figure">
        <img
          v-if="imgUrl !== ''"
          :key="imgUrl"
          v-lazy="imgUrl"
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
import sanitizeHtml from 'sanitize-html'
import _ from 'lodash'

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
    intro: {
      type: Object,
      required: true
    }
  },
  computed: {
    figcaption() {
      return _.get(this.intro, 'title', '')
    },
    description() {
      return sanitizeHtml(_.get(this.intro, ['brief', 'html'], ''), {
        // TODO: refacor this options to constants
        allowedTags: ['div', 'p', 'a']
      })
    },
    imgUrl() {
      return _.get(this.$getImgs(this.intro), ['mobile', 'url'], '')
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
  &__img
    display block
    object-fit cover
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
