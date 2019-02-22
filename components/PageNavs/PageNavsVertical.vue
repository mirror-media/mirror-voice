<template>
  <nav class="navs">
    <PageNavsVerticalList
      v-for="(item, i) in items"
      :key="i"
      class="navs__list"
      :list="item"
    />
  </nav>
</template>

<script>
import PageNavsVerticalList from './PageNavsVerticalList.vue'

export default {
  components: {
    PageNavsVerticalList
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.navs
  display flex
  &__list
    & + &
      margin 0 0 0 2px
</style>
