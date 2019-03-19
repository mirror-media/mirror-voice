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
      <nuxt-link :to="`/category/${category.name}`">
        {{ category.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
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
    left -13px
    &--wrap
      flex-wrap wrap
    &--no-wrap
      width calc(100% + 13px)
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
      margin 15px 0 0 13px
      cursor pointer
      box-shadow 1px 1px 1px 0 rgba(0, 0, 0, 0.1)
      background-color #ffffff
      border-radius 4px
      &--no-wrap
        flex 0 0 auto
      a
        display inline-block
        width 100%
        height 100%
        color #4a4a4a
        padding 10px 16px
        border-radius 4px
        &.nuxt-link-active
          color white
          background-color #273947
</style>
