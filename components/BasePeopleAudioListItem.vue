<template>
  <li class="list-item">
    <header class="list-item__header header">
      <h1
        class="header__title"
        v-text="title"
      />
    </header>
    <ol class="list-item__singles-list singles-list">
      <li
        v-for="(item, i) in data"
        :key="i"
        class="singles-list__list-item"
      >
        <AppSingleWithPlayIcon
          :title="item.title"
          :title-line-clamp="1"
          :audio="item.audio"
          :show-duration="true"
          :to="item.link"
        />
      </li>
    </ol>
  </li>
</template>

<script>
import _ from 'lodash'

import AppSingleWithPlayIcon from './AppSingleWithPlayIcon.vue'

export default {
  components: {
    AppSingleWithPlayIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
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
.list-item
  width 397px

.header
  &__title
    display inline-block
    padding 5px 10px
    border-radius 4px
    background-color #FE5000
    margin 0
    font-size 18px
    color white
    max-width 100%
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;

.singles-list
  list-style none
  margin 0
  padding 0
  &__list-item
    padding 21.5px 0 7.5px 0
    border-bottom 1px solid #efefef

@media (max-width 768px)
  .list-item
    width 100%

  .header
    &__title
      font-size 15px
      padding 5px 6px

  .singles-list
    &__list-item
      padding 19.5px 0 9.5px 0
</style>
