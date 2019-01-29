<template>
  <div class="navs">
    <PageNavsVerticalList class="navs__list"/>
    <PageNavsVerticalList class="navs__list"/>
  </div>
</template>

<script>
import PageNavsVerticalList from './PageNavsVerticalList.vue'

export default {
  components: {
    PageNavsVerticalList
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
