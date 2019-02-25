<template>
  <ol class="list">
    <TrackListItem
      v-for="(track, i) in tracks"
      :key="i"
      :class="[ 'list__list-item', { 'list__list-item--border-bottom': showListOrder && i === tracks.length - 1 } ]"
      :order="showListOrder ? getOrder(i) : 0"
      :item="track"
      @click.native="TOGGLE_APP_PLAYER"
    />
  </ol>
</template>

<script>
import { mapMutations } from 'vuex'

import TrackListItem from './TrackListItem.vue'

export default {
  components: {
    TrackListItem
  },
  props: {
    showListOrder: {
      type: Boolean,
      defalut: false
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
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_APP_PLAYER']),
    getOrder(i) {
      if (this.isLatestFirst) {
        return this.total - i - this.itemsPerPage * (this.page - 1)
      } else {
        return i + 1 + this.itemsPerPage * (this.page - 1)
      }
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
</style>
