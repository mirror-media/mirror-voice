<template>
  <nav class="navs">
    <ul class="navs__list section-list">
      <li
        v-for="(section, i) in sections"
        :key="i"
        class="section-list__list-item"
      >
        <nuxt-link
          :class="{ 'black': section.name === sectionName }"
          :to="`/section/${section.name}`"
        >
          {{ section.title }}
        </nuxt-link>
      </li>
    </ul>
    <ul class="navs__list category-list">
      <li class="category-list__list-item">
        <nuxt-link :to="`/section/${sectionName}`">
          全部
        </nuxt-link>
      </li>
      <li
        v-for="(category, i) in categoryListItems"
        :key="i"
        class="category-list__list-item"
      >
        <nuxt-link :to="`/category/${category.name}`">
          {{ category.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    sections: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    categories: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    routeParam() {
      return this.$route.params.name
    },
    sectionName() {
      let sectionName
      if (this.routeName.includes('section')) {
        sectionName = this.routeParam
      } else if (this.routeName.includes('category')) {
        const category = _.find(
          this.categories,
          o => o.name === this.routeParam
        )
        sectionName = _.get(category, 'sectionName', '')
      }
      return sectionName
    },
    categoryListItems() {
      const section = _.find(this.sections, o => o.name === this.sectionName)
      const categories = _.get(section, 'categories', [])
      return categories
    }
  }
}
</script>

<style lang="stylus" scoped>
.navs
  &__list
    list-style none
    margin 0
    padding 0
    display flex
    flex-wrap wrap

.section-list
  font-size 18px
  font-weight 600
  // color #7d7d7d
  line-height 1
  &__list-item
    padding 0 27px
    cursor pointer
    &:first-child
      padding 0 27px 0 0
    &:last-child
      padding 0 0 0 27px
    & + &
      border-left 2px solid #7d7d7d
    a
      color #7d7d7d
      // &.nuxt-link-active
      &.black
        color black

.category-list
  margin 24px 0 0 0
  font-size 14px
  color #7d7d7d
  position relative
  left -28px
  &__list-item
    margin 13px 0 0 28px
    cursor pointer
    a
      color #7d7d7d
      &.nuxt-link-active
        color #d84939
</style>
