<template>
  <li
    :class="[
      'list-item',
      `list-item--${layout}`,
      { 'list-item--hover': isMouseover && layout === 'horizontal' }
    ]"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div class="list-item__cover" />
    <div :class="[ 'list-item__info', `list-item__info--${layout}`, 'info' ]">
      <nuxt-link to="/album/fakeslug">
        <h1
          :class="[ 'info__title', { 'info__title--hover': isMouseover } ]"
        >
          {{ title }}
        </h1>
      </nuxt-link>
      <p class="info__author">
        {{ author }}
      </p>
      <AppDate
        v-if="layout === 'horizontal'"
        class="info__date"
      />
    </div>
  </li>
</template>

<script>
import _ from 'lodash'
import AppDate from '~/components/AppDate.vue'

export default {
  components: {
    AppDate
  },
  props: {
    layout: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    }
  },
  data() {
    return {
      limitTitle: 14,
      limitAuthor: 16,
      isMouseover: false
    }
  },
  computed: {
    title() {
      const text =
        '高難度對話：如何與挑剔的人高難度對話：如何與挑剔的人高難度對話：如何與挑剔的人'
      const textRandom = text.slice(0, Math.floor(Math.random() * 30))
      return _.truncate(textRandom, { length: this.limitTitle })
    },
    author() {
      const text =
        '夏綠節慶室內樂團夏綠節慶室內樂團夏綠節慶室內樂團夏綠節慶室內樂團'
      const textRandom = text.slice(0, Math.floor(Math.random() * 30))
      return _.truncate(textRandom, { length: this.limitAuthor })
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
.list-item
  display flex
  &--vertical
    width 120px
    flex-direction column
  &--horizontal
    width 310px
    padding 14px
    flex-direction row
  &--hover
    background-color #f5f5f5
  &__cover
    d = 120px
    width d
    min-width d
    height d
    min-height d
    background-color black
  &__info
    &--vertical
      margin 13px 0 0 0
    &--horizontal
      margin 0 0 0 15px

.info
  position relative
  &__title
    font-size 16px
    font-weight 600
    line-height 1.38
    margin 0
    color black
    &--hover
      color #d84939
  &__author
    font-size 14px
    line-height 1.29
    color #7d7d7d
    margin 13px 0 0 0
  &__date
    position absolute
    bottom 0
</style>
