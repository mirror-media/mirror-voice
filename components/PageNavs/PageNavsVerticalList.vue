<template>
  <ul class="list">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="list__list-item"
      @click="$emit('clickItem')"
    >
      <nuxt-link :to="`/category/${item.name}`">
        {{ item.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    list: {
      type: Object,
      default() {
        return {}
      },
      required: true
    }
  },
  computed: {
    items() {
      return _.take(_.get(this.list, 'categories', []), 7)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  width 127px
  list-style none
  margin 0
  padding 0
  &__list-item
    height 56px
    background-color white
    *
      display flex
      justify-content center
      align-items center
      width 100%
      height 100%
      font-size 16px
      color black
      &:hover
        color #d84939
    & + &
      margin 2px 0 0 0
</style>
