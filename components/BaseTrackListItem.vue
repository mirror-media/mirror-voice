<template>
  <li
    :class="[
      'list-item',
      { 'list-item--hover': isMouseover },
      { 'list-item--more-padding': showOrder },
      { 'list-item--more-padding-bottom': showProgressBar }
    ]"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div class="list-item__marker-wrapper marker-wrapper">
      <BaseTrackMarker
        :class="[
          'marker-wrapper__marker',
          { 'marker-wrapper__marker--show-order': showOrder },
          { 'marker-wrapper__marker--hover': isMouseover }
        ]"
        :status="status"
        :order="order"
      />
    </div>
    <div class="list-item__info-wrapper info-wrapper">
      <div class="info-wrapper__title-vocals-wrapper title-vocals-wrapper">
        <nuxt-link
          :class="[
            'title-vocals-wrapper__title',
            { 'title-vocals-wrapper__title--hover': !showOrder && isMouseover }
          ]"
          :to="`/single/${slug}`"
          @click.native.stop="$emit('clickLink')"
          v-text="item.title"
        />
        <p
          v-if="showVocals"
          class="title-vocals-wrapper__vocals"
          v-text="vocals"
        />
      </div>
      <div class="info-wrapper__relative-time-wrapper relative-time-wrapper">
        <p
          class="relative-time-wrapper__date"
          v-text="relativeTime"
        />
      </div>
      <div
        v-show="showProgressBar"
        class="info-wrapper__duration-progress-bar"
        :style="{
          width: `${100 * playedProgress}%`
        }"
      />
    </div>
  </li>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'

import BaseTrackMarker from './BaseTrackMarker.vue'

export default {
  components: {
    BaseTrackMarker
  },
  props: {
    showOrder: {
      type: Boolean,
      default: false
    },
    showVocals: {
      type: Boolean,
      default: false
    },
    playedProgress: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 1
      }
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
    },
    relativeTimeBy: {
      type: String,
      required: true
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
      const date = _.get(this.item, this.relativeTimeBy, '')
      return this.calcRelativeTime(date)
    },
    slug() {
      return _.get(this.item, 'slug', '')
    },
    vocals() {
      return _.get(this.item, 'vocals', [])
        .map(vocal => _.get(vocal, 'name', ''))
        .join('、')
    },
    showProgressBar() {
      return this.playedProgress > 0
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
  &--more-padding-bottom
    padding-bottom calc(12px + 5px)
  &__info-wrapper
    margin 0 0 0 9px

.marker-wrapper
  display flex
  align-items center
  &__marker
    // margin 0 9px 0 0
    display none !important
    &--show-order
      display flex !important
    &--hover
      display flex !important

.info-wrapper
  display flex
  align-items center
  flex 1 1 auto
  width 0
  max-width 100%
  position relative
  height 100%
  &__title-vocals-wrapper
    flex 1 1 auto
    width 0
  &__relative-time-wrapper
    min-width max-content
  &__duration-progress-bar
    height 4px
    background-color #aaaaaa
    position absolute
    left 0
    bottom calc(-12px - 5px)
    transition width .25s ease-out

.title-vocals-wrapper
  display flex
  flex-direction column
  justify-content center
  &__title
    color black
    max-width 100%
    display inline-block
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    &--hover
      color #dc5a4c
  &__vocals
    max-width 100%
    font-size 14px
    color #7d7d7d
    margin 10px 0 0 0
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

.relative-time-wrapper
  color #7d7d7d
  margin 0 0 0 10px
  display flex
  justify-content center
  align-items center

@media (max-width 768px)
  .list-item
    height 60px
    padding 0
    font-size 13px
    &__marker-wrapper
      margin 0 0 0 13px
    &__info-wrapper
      margin 0 0 0 13px

  .marker-wrapper
    &__marker
      display flex
      &--show-order
        display flex
      &--hover
        display flex

  .info-wrapper
    border-bottom 2px solid #eeeeee
    &__duration-progress-bar
      bottom 0

  .title-vocals-wrapper
    &__vocals
      font-size 13px

  .relative-time-wrapper
    margin 0 11px 0 10px
    font-size 11px
</style>
