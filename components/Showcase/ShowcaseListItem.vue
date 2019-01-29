<template>
  <li class="list-item">
    <div class="list-item__cover"></div>
    <div class="list-item__info info">
      <h1 class="info__title">{{ title }}</h1>
      <p class="info__author">{{ author }}</p>
    </div>
  </li>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      limitTitle: 14,
      limitAuthor: 16
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
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  width 120px
  &__cover
    d = 120px
    width d
    height d
    background-color black

.info
  &__title
    font-size 16px
    font-weight 600
    line-height 1.38
    margin 13px 0
  &__author
    font-size 14px
    line-height 1.29
    color #7d7d7d
</style>
