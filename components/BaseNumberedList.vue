<template>
  <div class="list-wrapper">
    <header class="list-wrapper__header header">
      <h1
        class="header__title"
        v-text="title"
      />
    </header>
    <ol
      v-if="listData.length > 0"
      class="list-wrapper__list list"
    >
      <li
        v-for="(item, i) in listData"
        :key="i"
        class="list__list-item list-item"
      >
        <BaseSingleWithPlayIcon
          :title="item.title"
          :title-line-clamp="2"
          :audio="item.audio"
          :to="item.link"
          class="list-item__single"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import _ from 'lodash'

import BaseSingleWithPlayIcon from './BaseSingleWithPlayIcon.vue'

export default {
  components: {
    BaseSingleWithPlayIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      default: () => [],
      validator(data) {
        return (
          _.isEmpty(data) ||
          (_.every(data, d => 'title' in d) &&
            _.every(data, d => 'audio' in d) &&
            _.every(data, d => 'link' in d))
        )
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  background-color white
  box-shadow 1px 1px 5px #00000029
  padding 22px 24.3px 10.5px 24.3px
  width 840px
  &__list
    margin 10px 0 0 0

.header
  display flex
  justify-content space-between
  align-items center
  &__title
    font-size 22px
    font-weight bold
    color #FE5000
    margin 0

.list
  list-style none
  padding 0
  display flex
  flex-wrap wrap
  counter-reset custom-counter
  &__list-item
    counter-increment custom-counter
    &:before
      content counter(custom-counter)
      display inline-flex
      justify-content center
      align-items center
      width 22px
      height 22px
      min-width 22px
      min-height 22px
      max-width 22px
      max-height 22px
      border-radius 100%
      background-color #B8B8B8
      font-size 15px
      color white
    &:nth-child(2n)
      margin-left 20px

.list-item
  width 385px
  padding-top 5.5px
  padding-bottom 5.5px
  border-bottom 1px solid #EFEFEF
  display flex
  align-items center
  &__single
    margin 0 0 0 15px

@media (max-width 768px)
  .list-wrapper
    box-shadow none
    padding 16px 16px 10px 16px
    width 100%
    &__list
      margin 13px 0 0 0

  .header
    &__title
      font-size 16px

  .list
    &__list-item
      border-bottom none
      & + &
        border-top 1px solid #EFEFEF
      &:nth-child(2n)
        margin-left 0

  .list-item
    padding-top 10.5px
    padding-bottom 10.5px
</style>
