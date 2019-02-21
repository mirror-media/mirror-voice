<template>
  <nav class="navs">
    <PageNavsVerticalList
      v-for="(section, i) in sections"
      :key="i"
      class="navs__list"
      :list="section"
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
    sections: {
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
