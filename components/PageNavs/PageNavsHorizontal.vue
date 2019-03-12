<template>
  <nav class="navs">
    <ul class="navs__list section-list">
      <li
        v-for="(section, i) in sections"
        :key="i"
        class="section-list__list-item"
      >
        <nuxt-link
          :class="{ 'active': section.name === sectionName }"
          :to="`/section/${section.name}`"
        >
          {{ section.title }}
        </nuxt-link>
      </li>
    </ul>
    <!-- This wrapper is for mobile's folding prupose -->
    <div
      :class="[
        'navs__category-list-wrapper',
        { 'navs__category-list-wrapper--fold': isCategoriesFold },
        { 'navs__category-list-wrapper--expand': !isCategoriesFold }
      ]"
    >
      <PageNavsHorizontalList
        ref="category-list"
        class="navs__list category-list"
        :section-name="sectionName"
        :items="categoryListItems"
      />
    </div>
    <div
      v-show="shouldShowReadMore"
      class="navs__read-more read-more"
      @click="isCategoriesFold = !isCategoriesFold"
    >
      <div
        :class="[
          'read-more__icon',
          { 'read-more__icon--reverse': !isCategoriesFold }
        ]"
      />
    </div>
  </nav>
</template>

<script>
import _ from 'lodash'

import PageNavsHorizontalList from './PageNavsHorizontalList.vue'

export default {
  components: {
    PageNavsHorizontalList
  },
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
  data() {
    return {
      isCategoriesFold: true,
      shouldShowReadMore: true
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
  },
  mounted() {
    // 182 is the max-height we want to display the category list
    this.shouldShowReadMore = this.$refs['category-list'].$el.offsetHeight > 182
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
      &.active
        color black

.category-list
  margin 24px 0 0 0 !important

@media (max-width 768px)
  .navs
    position relative
    &__category-list-wrapper
      overflow-y hidden
      &--fold
        max-height calc((15px + 34px) * 3 + 32px)
      &--expand
        max-height none
    &__read-more
      width 100%
      height 19px
      background-color transparent
      position absolute
      bottom 0
      left 0

  .section-list
    background-color #273947
    height 47px
    font-size 13px
    &__list-item
      flex 1 1 auto
      padding 0
      display flex
      justify-content center
      align-items center
      &:first-child
        padding 0
      &:last-child
        padding 0
      & + &
        border-left none
      a
        color white
        // &.nuxt-link-active
        &.active
          color white
          font-size 17px

  .category-list
    margin 0 !important
    padding 0 18px 35px 18px !important

  .read-more
    display flex
    justify-content center
    align-items center
    background-color #eeeeee
    &__icon
      width 0
      height 0
      border-style solid
      border-width 5px 5px 0 5px
      border-color #4a4a4a transparent transparent transparent
      transform rotate(0deg)
      &--reverse
        transform rotate(180deg)
</style>
