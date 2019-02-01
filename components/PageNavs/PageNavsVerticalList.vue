<template>
  <ul class="list">
    <li class="list__list-item">
      <nuxt-link to="/section/section1">類別一</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category1">子類別 1</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category2">子類別 2</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category3">子類別 3</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category4">子類別 4</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category5">子類別 5</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category6">子類別 6</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category7">子類別 7</nuxt-link>
    </li>
    <li class="list__list-item">
      <nuxt-link to="/category/category8">子類別 8</nuxt-link>
    </li>
  </ul>
</template>

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
