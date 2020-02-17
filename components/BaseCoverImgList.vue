<template>
  <div
    :class="[
      'list-wrapper',
      `list-wrapper--${columns}-column`
    ]"
  >
    <header
      v-if="showHeader"
      class="list-wrapper__header header"
    >
      <h1
        class="header__title"
        v-text="title"
      />
      <BaseTextWithArrow
        class="header__more"
        :text="'更多'"
        @click.native="handleClickMore"
      />
    </header>
    <ol
      v-if="listData.length > 0"
      class="list-wrapper__list list"
    >
      <BaseCoverImgListItem
        v-for="(item, i) in listData"
        :key="i"
        :img-src="item.cover"
        :img-size="coverSize"
        :title="item.title"
        :subtitle="item.subtitle"
        :content="item.content"
        :to="item.link"
        :memorized-remaining-duration-seconds="getRemaining(item)"
        :memorized-date="getMemorizedDate(item)"
        :class="[
          'list__list-item',
          `list__list-item--${columns}-column`
        ]"
        @clickPlayIconWrapper="$emit('playItem', item)"
      />
    </ol>
  </div>
</template>

<script>
import _ from 'lodash'

import BaseTextWithArrow from './BaseTextWithArrow.vue'
import BaseCoverImgListItem from './BaseCoverImgListItem.vue'

export default {
  components: {
    BaseTextWithArrow,
    BaseCoverImgListItem
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showStorageInfo: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Number,
      default: 1,
      validator(value) {
        return [1, 2, 3].includes(value)
      }
    },
    title: {
      type: String,
      default: ''
    },
    linkMore: {
      type: String,
      default: '/'
    },
    listData: {
      type: Array,
      default: () => [],
      validator(data) {
        return (
          _.isEmpty(data) ||
          (_.every(data, d => 'title' in d) &&
            _.every(data, d => 'subtitle' in d) &&
            _.every(data, d => 'cover' in d) &&
            _.every(data, d => 'link' in d))
        )
      }
    }
  },
  computed: {
    coverSize() {
      switch (this.columns) {
        case 3:
        case 2:
          return 'bigger'
        case 1:
        default:
          return 'smaller'
      }
    }
  },
  methods: {
    handleClickMore() {
      this.$router.push(this.linkMore)
    },
    getRemaining(item) {
      if (!this.showStorageInfo) {
        return -1
      } else {
        return _.get(item, 'remainingDuration', -1)
      }
    },
    getMemorizedDate(item) {
      return _.get(item, 'memorizedDate', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  background-color white
  box-shadow 1px 1px 5px #00000029
  padding 22px 24.3px 10.5px 24.3px
  &--1-column
    width 410px
  &--2-column
    width 840px
  &--3-column
    width 1280px
  &__header
    margin 0 0 10px 0

.header
  display flex
  justify-content space-between
  align-items center
  &__title
    font-size 22px
    font-weight bold
    color #FE5000
    margin 0
  &__more
    cursor pointer

.list
  list-style none
  padding 0
  display flex
  flex-wrap wrap
  &__list-item
    &--1-column
      & + &
        padding-top 10.5px
        border-top 1px solid #EFEFEF
    &--2-column
      width 385px
      padding-top 10.5px
      border-bottom 1px solid #EFEFEF
      &:nth-child(2n)
        margin-left 20px
    &--3-column
      width 385px
      padding-top 10.5px
      border-bottom 1px solid #EFEFEF
      &:not(:nth-child(3n-2)) // not 1, 4, 7, 10...
        margin-left 35px

@media (max-width 768px)
  .list-wrapper
    box-shadow none
    padding 16px 16px 10px 16px
    &--1-column, &--2-column, &--3-column
      width 100%
    &__header
      margin 0 0 13px 0

  .header
    &__title
      font-size 16px

  .list
    &__list-item
      &--1-column, &--2-column, &--3-column
        width 100%
        border-bottom none
        & + &
          padding-top 10.5px
          border-top 1px solid #EFEFEF
        &:nth-child(2n)
          margin-left 0
        &:not(:nth-child(3n-2)) // not 1, 4, 7, 10...
          margin-left 0
</style>
