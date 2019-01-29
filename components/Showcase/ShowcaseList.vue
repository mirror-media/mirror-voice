<template>
  <ul class="list">
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
  &__list-item
    & + &
      margin 0 0 0 18px
    &:nth-child(n+6)
      margin 18px 0 0 18px
    &:nth-child(5n + 1):not(:nth-child(1))
      margin 18px 0 0 0
</style>
