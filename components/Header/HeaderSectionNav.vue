<template>
  <div class="nav-wrapper">
    <nav class="nav">
      <nuxt-link
        class="nav__section"
        :to="`/section/${sectionName}`"
        v-text="sectionTitle"
      />
      <ol class="nav__categories-list categories-list">
        <li
          v-for="category in categories"
          :key="category.id"
        >
          <nuxt-link
            :to="`/category/${getName(category)}`"
            v-text="getCategoryTitle(category)"
          />
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  computed: {
    sectionTitle() {
      return _.get(this.section, 'title', '')
    },
    sectionName() {
      return _.get(this.section, 'name', '')
    },
    categories() {
      return _.get(this.section, 'categories', [])
    }
  },
  methods: {
    getName(item) {
      return _.get(item, 'name', '')
    },
    getCategoryTitle(item) {
      return _.get(item, 'title', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-wrapper
  height 60px
  display flex
  align-items center
  &:hover
    .nav__section
      color #1E170F
    .nav__categories-list
      display initial

.nav
  width 130px
  height 22px
  display flex
  padding 0 7px
  position relative
  border-left 2px solid #FE5000
  &__section
    width 100%
    height 100%
    font-size 16px
    font-weight bold
    color #6F6F6F
    display flex
    align-items center
    transition color .25s ease-out
  &__categories-list
    position absolute
    top calc(100% + (60px - 100%) / 2)
    left 0
    display none

.categories-list
  z-index 1000
  margin 0
  padding 0
  list-style none
  width max-content
  border-top 3px solid #FE5000
  background-color white
  box-shadow 0px 3px 6px #00000029
  li
    height 50px
    border-bottom 1px solid #EFEFEF
    display flex
    align-items center
    a
      width 100%
      height 100%
      display flex
      align-items center
      padding 0 8px
      font-size 14px
      font-weight bold
      color #1E170F
      background-color white
      transition filter .25s ease-out
      &:hover
        filter brightness(95%)

@media (max-width 768px)
  .nav-wrapper
    height 50px
    &:hover
      .nav__section
        color #6F6F6F
      .nav__categories-list
        display none

  .nav
    width 106px
    height 16px
    &__section
      font-size 15px

@media (max-width 320px)
  .nav
    width 86px
    &__section
      font-size 11px
</style>
