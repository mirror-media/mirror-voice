<template>
  <ul :class="[ 'list', `list--${listItemLayout}` ]">
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
    <ShowcaseListItem
      :class="[ 'list__list-item', `list__list-item--${listItemLayout}` ]"
      :layout="listItemLayout"
    />
  </ul>
</template>

<script>
import ShowcaseListItem from './ShowcaseListItem.vue'

export default {
  props: {
    listItemLayout: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    }
  },
  components: {
    ShowcaseListItem
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
</style>
