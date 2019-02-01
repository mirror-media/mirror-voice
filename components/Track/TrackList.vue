<template>
  <ol class="list">
    <TrackListItem
      class="list__list-item"
      :showListOrder="showListOrder"
    />
    <TrackListItem
      class="list__list-item"
      :showListOrder="showListOrder"
    />
    <TrackListItem
      class="list__list-item"
      :showListOrder="showListOrder"
    />
    <TrackListItem
      class="list__list-item"
      :showListOrder="showListOrder"
    />
  </ol>
</template>

<script>
import TrackListItem from './TrackListItem.vue'

export default {
  props: {
    showListOrder: {
      type: Boolean,
      defalut: false
    }
  },
  components: {
    TrackListItem
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
</style>
