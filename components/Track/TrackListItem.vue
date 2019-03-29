<template>
  <li
    :class="[
      'list-item',
      { 'list-item--hover': isMouseover },
      { 'list-item--more-padding': showOrder }
    ]"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div class="list-item__left left">
      <TrackMarker
        :class="[
          'left__marker',
          { 'left__marker--show-order': showOrder },
          { 'left__marker--hover': isMouseover }
        ]"
        :status="status"
        :order="order"
      />
      <nuxt-link
        :class="[
          'left__title',
          { 'left__title--hover': !showOrder && isMouseover }
        ]"
        :to="`/single/${slug}`"
        @click.native.stop
      >
        {{ item.title }}
      </nuxt-link>
    </div>
    <div
      v-show="showOrder || !isMouseover"
      class="list-item__right right"
    >
      <p class="right__date">
        {{ relativeTime }}
      </p>
    </div>
  </li>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'

import TrackMarker from './TrackMarker.vue'

export default {
  components: {
    TrackMarker
  },
  props: {
    showOrder: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      required: true
    },
    isPlaying: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMouseover: false
    }
  },
  computed: {
    status() {
      if (this.isPlaying) {
        return 'playing'
      }

      if (this.isMouseover) {
        return 'play'
      }

      return this.showOrder ? 'order' : 'play'
    },
    relativeTime() {
      return this.calcRelativeTime(this.item.publishedDate)
    },
    slug() {
      return _.get(this.item, 'slug', '')
    }
  },
  methods: {
    onMouseover() {
      this.isMouseover = true
    },
    onMouseout() {
      this.isMouseover = false
    },
    calcRelativeTime(date) {
      date = dayjs(date)
      const current = dayjs()

      const diff = current.diff(date, 'hour')
      const hour = 1
      const day = 24 * hour
      const week = 7 * day

      if (diff >= 0 && diff < hour) {
        return '剛剛'
      } else if (diff >= hour && diff < day) {
        return `${diff} 小時前`
      } else if (diff >= day && diff < week) {
        return `${Math.ceil(diff / 24)} 天前`
      } else {
        return date.format('MM-DD')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  justify-content space-between
  font-size 14px
  padding 12px 10px
  width 100%
  cursor pointer
  &--hover
    background-color #eeeeee
  &--more-padding
    padding 12px 21px

.left
  overflow hidden
  flex 1 1 auto
  display flex
  align-items center
  &__marker
    margin 0 9px 0 0
    position relative
    bottom 1px
    display none !important
    &--show-order
      display flex !important
    &--hover
      display flex !important
  &__title
    color black
    max-width 100%
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    &--hover
      color #dc5a4c

.right
  color #7d7d7d
  min-width max-content
  margin 0 0 0 10px
  display flex
  justify-content center
  align-items center

@media (max-width 768px)
  .list-item
    height 60px
    padding 0 7px 0 13px
    font-size 13px

  .left
    &__marker
      margin 0 13px 0 0
      display flex
      &--show-order
        display flex
      &--hover
        display flex

  .right
    font-size 11px
</style>
