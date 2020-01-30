<template>
  <nav class="navs">
    <HeaderNav
      v-for="category in categories"
      :key="category.id"
      :text="category.title"
      :to="`/category/${category.name}`"
      class="navs__nav"
    />
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import HeaderNav from '~/components/Header/HeaderNav.vue'

export default {
  components: {
    HeaderNav
  },
  computed: {
    ...mapState(['categories'])
  }
}
</script>

<style lang="stylus" scoped>
.navs
  display flex
  align-items center
  position relative
  top 3px
  &__nav
    & + &
      margin 0 0 0 60px

@media (max-width 768px)
  .navs
    background-color white
    padding 7px 34px 5px 34px
    overflow-y scroll
    &:after
      content ''
      display inline-block
      min-width 34px
      height 1px
    &__nav
      flex 1 0 auto
</style>
