<template>
  <ul :class="`list list--${shouldWrap ? 'wrap' : 'no-wrap'}`">
    <li
      v-show="sectionName !== ''"
      :class="`list__list-item list__list-item--${shouldWrap ? 'wrap' : 'no-wrap'}`"
      @click="$emit('clickItemFirst')"
    >
      <nuxt-link :to="`/section/${sectionName}`">
        全部
      </nuxt-link>
    </li>
    <li
      v-for="(category, i) in items"
      :key="i"
      :class="`list__list-item list__list-item--${shouldWrap ? 'wrap' : 'no-wrap'}`"
      @click="$emit('clickItem')"
    >
      <nuxt-link :to="`/category/${getName(category)}`">
        {{ getTitle(category) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    sectionName: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    },
    shouldWrap: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getName(item) {
      return _.get(item, 'name', '')
    },
    getTitle(item) {
      return _.get(item, 'title', '')
    }
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
  font-size 14px
  color #7d7d7d
  position relative
  left -28px
  top -6px
  &__list-item
    margin 13px 0 0 28px
    cursor pointer
    a
      color #7d7d7d
      &.nuxt-link-active
        color #d84939

@media (max-width 768px)
  .list
    flex-wrap nowrap
    font-size 13px
    color #4a4a4a
    left -10px
    top 0
    &--wrap
      flex-wrap wrap
      width calc(100% + 10px)
    &--no-wrap
      width calc(100% + 10px)
      overflow-x scroll
      -webkit-overflow-scrolling touch
      &::-webkit-scrollbar
        display none
        background-color transparent
      &::-webkit-scrollbar-track
        background-color transparent
      &::-webkit-scrollbar-thumb
        background-color transparent
    &__list-item
      margin 16px 0 0 10px
      cursor pointer
      background-color #B8B8B8
      min-width 110px
      height 25px
      &--no-wrap
        flex 0 0 auto
      a
        padding 0 10px
        display flex
        justify-content center
        align-items center
        width 100%
        height 100%
        color white
        font-weight bold
        border-radius 4px
        &.nuxt-link-active
          color white
          background-color #FE5000
</style>
