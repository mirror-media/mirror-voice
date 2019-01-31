<template>
  <nav class="navs">
    <ul class="navs__list section-list">
      <li class="section-list__list-item">類別一</li>
      <li class="section-list__list-item">類別二</li>
    </ul>
    <ul class="navs__list category-list">
      <li class="category-list__list-item">全部</li>
      <li class="category-list__list-item">文學</li>
      <li class="category-list__list-item">懸疑</li>
      <li class="category-list__list-item">生活</li>
      <li class="category-list__list-item">都市</li>
      <li class="category-list__list-item">教材</li>
      <li class="category-list__list-item">幻想</li>
      <li class="category-list__list-item">經典</li>
      <li class="category-list__list-item">武俠</li>
      <li class="category-list__list-item">童書</li>
      <li class="category-list__list-item">歷史小說</li>
      <li class="category-list__list-item">勵志</li>
      <li class="category-list__list-item">外文原版</li>
      <li class="category-list__list-item">社科</li>
      <li class="category-list__list-item">商業</li>
      <li class="category-list__list-item">言情</li>
      <li class="category-list__list-item">官場商戰</li>
      <li class="category-list__list-item">諸如此類</li>
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
  color #7d7d7d
  line-height 1
  &__list-item
    padding 0 27px
    cursor pointer
    &:first-child
      padding 0 27px 0 0
    & + &
      border-left 2px solid #7d7d7d

.category-list
  margin 24px 0 0 0
  font-size 14px
  color #7d7d7d
  position relative
  left -28px
  &__list-item
    margin 13px 0 0 28px
    cursor pointer
</style>
