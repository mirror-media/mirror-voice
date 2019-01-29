<template>
  <li
    :class="[ 'list-item', { 'list-item--hover': isMouseover } ]"
    @mouseover="showMarker"
    @mouseout="hideMarker"
  >
    <div class="list-item__left left">
      <TrackMarker
        v-show="isMouseover"
        class="left__marker"
      />
      <p :class="[ 'left__title', { 'left__title--hover': isMouseover } ]">{{ '高難度對話：如何與挑剔的人高難度對話：如何與挑剔的人高難度對話：如何與挑剔的人' }}</p>
    </div>
    <div
      v-show="!isMouseover"
      class="list-item__right right"
    >
      <p class="right__date">{{ '12 小時前' }}</p>
    </div>
  </li>
</template>

<script>
import TrackMarker from './TrackMarker.vue'

export default {
  components: {
    TrackMarker
  },
  data() {
    return {
      isMouseover: false
    }
  },
  methods: {
    showMarker() {
      this.isMouseover = true
    },
    hideMarker() {
      this.isMouseover = false
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

.left
  overflow hidden
  flex 1 1 auto
  display flex
  align-items center
  &__marker
    margin 0 9px 0 0
    position relative
    bottom 1px
  &__title
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    &--hover
      color #dc5a4c

.right
  color #7d7d7d
  min-width max-content
  margin 0 0 0 10px
</style>
