<template>
  <ol class="list">
    <BaseTrackListItem
      v-for="(track, i) in tracks.slice(0, itemsPerPage)"
      :key="i"
      :class="[
        'list__list-item',
        { 'list__list-item--border-bottom': showListOrder && i === tracks.length - 1 }
      ]"
      :show-order="showListOrder"
      :show-vocals="showVocals"
      :played-progress="getPlayedProgress(track)"
      :order="getOrder(i)"
      :item="track"
      :is-playing="getIsPlaying(track)"
      :relative-time-by="relativeTimeBy"
      @click.native="$emit('playTrack', track.slug)"
      @clickLink="$emit('clickLink')"
    />
  </ol>
</template>

<script>
import _ from 'lodash'

import BaseTrackListItem from './BaseTrackListItem.vue'

export default {
  components: {
    BaseTrackListItem
  },
  props: {
    showListOrder: {
      type: Boolean,
      defalut: false
    },
    showVocals: {
      type: Boolean,
      defalut: false
    },
    showPlayedProgress: {
      type: Boolean,
      default: false
    },
    currentSound: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    tracks: {
      type: Array,
      required: true
    },
    isLatestFirst: {
      type: Boolean,
      default: true
    },
    page: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    relativeTimeBy: {
      type: String,
      default: 'publishedDate'
    }
  },
  methods: {
    getOrder(i) {
      if (this.isLatestFirst) {
        return this.total - i - this.itemsPerPage * (this.page - 1)
      } else {
        return i + 1 + this.itemsPerPage * (this.page - 1)
      }
    },
    getIsPlaying(track) {
      const slug = _.get(track, 'slug', '')
      return (
        this.isPlaying &&
        slug !== '' &&
        slug === _.get(this.currentSound, 'slug', '')
      )
    },
    getPlayedProgress(track) {
      if (!this.showPlayedProgress) {
        return 0
      }
      return _.get(track, 'playedProgress', 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  list-style none
  margin 0
  padding 0
  &__list-item
    border-top 1px solid #eeeeee
    &--border-bottom
      border-bottom 1px solid #eeeeee

@media (max-width 768px)
  .list
    &__list-item
      border-top none
      &--border-bottom
        border-bottom none
</style>
