<template>
  <nav class="navs">
    <AppCategoriesNavItem
      v-for="category in categories"
      :key="category.id"
      :text="category.title"
      :to="`/category/${category.name}`"
      class="navs__nav"
    />
  </nav>
</template>

<script>
import AppCategoriesNavItem from './AppCategoriesNavItem.vue'

export default {
  components: {
    AppCategoriesNavItem
  },
  computed: {
    categories() {
      return [
        {
          id: 'latest',
          name: 'latest',
          title: this.$DEFAULT_TITLE_LATEST
        },
        {
          id: 'popular',
          name: 'popular',
          title: this.$DEFAULT_TITLE_POPULAR
        },
        ...this.$store.state.categories
      ]
    }
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
    &.nuxt-link-active
      color black
      font-weight bold
      border-bottom 3px solid #FF6D2D

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
