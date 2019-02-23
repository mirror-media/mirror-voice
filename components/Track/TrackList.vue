<template>
  <ol class="list">
    <TrackListItem
      v-for="(track, i) in tracks"
      :key="i"
      :class="[ 'list__list-item', { 'list__list-item--border-bottom': showListOrder && i === tracks.length - 1 } ]"
      :order="i + 1"
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
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_APP_PLAYER'])
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
