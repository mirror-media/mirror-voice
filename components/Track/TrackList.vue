<template>
  <ol class="list">
    <TrackListItem
      class="list__list-item"
      :show-list-order="showListOrder"
    />
    <TrackListItem
      class="list__list-item"
      :show-list-order="showListOrder"
    />
    <TrackListItem
      class="list__list-item"
      :show-list-order="showListOrder"
    />
    <TrackListItem
      :class="[ 'list__list-item', { 'list__list-item--border-bottom': showListOrder } ]"
      :show-list-order="showListOrder"
    />
  </ol>
</template>

<script>
import TrackListItem from './TrackListItem.vue'

export default {
  components: {
    TrackListItem
  },
  props: {
    showListOrder: {
      type: Boolean,
      defalut: false
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
