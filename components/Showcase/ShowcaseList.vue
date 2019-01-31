<template>
  <ul :class="[ 'list', `list--${listItemLayout}` ]">
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
    <ShowcaseListItem class="list__list-item"/>
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
  &__list-item
    margin 18px 0 0 18px
</style>
