<template>
  <nav class="navs">
    <ul class="navs__list section-list">
      <li class="section-list__list-item">
        <nuxt-link to="/section/section1">
          類別一
        </nuxt-link>
      </li>
      <li class="section-list__list-item">
        <nuxt-link to="/section/section2">
          類別二
        </nuxt-link>
      </li>
    </ul>
    <ul class="navs__list category-list">
      <li class="category-list__list-item">
        <nuxt-link to="/section/section1">
          全部
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          文學
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          懸疑
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          生活
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          都市
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          教材
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          幻想
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          經典
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          武俠
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          童書
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          歷史小說
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          勵志
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          外文原版
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          社科
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          商業
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          言情
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          官場商戰
        </nuxt-link>
      </li>
      <li class="category-list__list-item">
        <nuxt-link to="/category/1">
          諸如此類
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

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
</style>
