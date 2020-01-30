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
      <BasePeopleAudioListItem
        v-for="(item, i) in listData"
        :key="i"
        :title="item.title"
        :data="item.singles"
        class="list__list-item"
      />
    </ol>
  </div>
</template>

<script>
import _ from 'lodash'

import BasePeopleAudioListItem from './BasePeopleAudioListItem.vue'

export default {
  components: {
    BasePeopleAudioListItem
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
            _.every(data, d => 'singles' in d))
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
  width 1280px

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
  margin -3.5px -10px
  margin-top calc(-3.5px + 16px)
  &__list-item
    margin 3.5px 10px
    &:nth-child(n + 4)
      padding-top 17px
      border-top 5px solid #EFEFEF

@media (max-width 768px)
  .list-wrapper
    box-shadow none
    padding 16px 16px 10px 16px
    width 100%
    // &__list
    //   margin 13px 0 0 0

  .header
    &__title
      font-size 16px

  .list
    margin 13px 0 0 0
    &__list-item
      margin 0
      &:nth-child(n + 4)
        padding 0
        border-top none
      & + &
        &:before
          content ''
          display block
          width 100vw
          height 5px
          background-color #EFEFEF
          position relative
          left -16px
          margin 0 0 11px 0
</style>
