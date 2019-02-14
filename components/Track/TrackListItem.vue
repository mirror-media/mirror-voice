<template>
  <li
    :class="[
      'list-item',
      { 'list-item--hover': isMouseover },
      { 'list-item--more-padding': showListOrder }
    ]"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div class="list-item__left left">
      <TrackMarker
        v-show="showListOrder || isMouseover"
        class="left__marker"
        :status="status"
      />
      <nuxt-link to="/single/fakeslug1">
        <p
          :class="[
            'left__title',
            { 'left__title--hover': !showListOrder && isMouseover } ]"
        >
          {{ '高難度對話：如何與挑剔的人高難度對話：如何與挑剔的人高難度對話：如何與挑剔的人' }}
        </p>
      </nuxt-link>
    </div>
    <div
      v-show="showListOrder || !isMouseover"
      class="list-item__right right"
    >
      <p class="right__date">
        {{ '12 小時前' }}
      </p>
    </div>
  </li>
</template>

<script>
import TrackMarker from './TrackMarker.vue'

export default {
  components: {
    TrackMarker
  },
  props: {
    showListOrder: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      isMouseover: false
    }
  },
  computed: {
    status() {
      if (this.isMouseover) {
        return 'play'
      }

      return this.showListOrder ? 'order' : 'play'
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
  &__title
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    color black
    &--hover
      color #dc5a4c

.right
  color #7d7d7d
  min-width max-content
  margin 0 0 0 10px
</style>
