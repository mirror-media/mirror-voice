<template>
  <ul :class="[ 'list', `list--${listItemLayout}` ]">
    <ShowcaseListItem
      v-for="(item, i) in list"
      :key="i"
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
      :item="item"
      :to-route="'album'"
      @click.native="handleClickListItem(item)"
    />
  </ul>
</template>

<script>
import _ from 'lodash'
import ShowcaseListItem from './ShowcaseListItem.vue'

export default {
  components: {
    ShowcaseListItem
  },
  props: {
    listItemLayout: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleClickListItem(item) {
      this.$emit('clickItem', item)
      this.$router.push(`/album/${_.get(item, 'name', '')}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  list-style none
  margin 0
  padding 0
  display flex
  flex-wrap wrap
  position relative
  &--vertical
    top -18px
    left -18px
    width calc(100% + 18px)
  &--horizontal
    top -14px
    left -16px
    width calc(100% + 16px)
  &__list-item
    &--vertical
      margin 18px 0 0 18px
    &--horizontal
      margin 14px 0 0 12px

@media (max-width 768px)
  .list
    &--horizontal
      top 0
      left 0
      width 100%
    &__list-item
      &--horizontal
        margin 20px 0 0 0
</style>
