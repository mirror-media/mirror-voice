<template>
  <section class="list-wrapper">
    <header class="list-wrapper__header header">
      <h1
        class="header__title"
        v-text="title"
      />
    </header>
    <ol class="list-wrapper__list list">
      <li
        v-for="(item, i) in listData"
        :key="i"
        class="list__list-item"
      >
        <BaseAlbumAudioList
          :album-title="item.title"
          :album-to="item.link"
          :album-description="item.brief"
          :album-cover-img-src="item.cover"
          :list-data="item.singles"
        />
      </li>
    </ol>
  </section>
</template>

<script>
import _ from 'lodash'

import BaseAlbumAudioList from './BaseAlbumAudioList.vue'

export default {
  components: {
    BaseAlbumAudioList
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
            _.every(data, d => 'link' in d) &&
            _.every(data, d => 'brief' in d) &&
            _.every(data, d => 'cover' in d) &&
            _.every(data, d => 'singles' in d))
        )
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  width 1280px

.header
  display flex
  justify-content space-between
  align-items center
  padding 0 0 10px 20px
  &__title
    font-size 22px
    font-weight bold
    color #FE5000
    margin 0

.list
  list-style none
  margin 0
  padding 0
  display flex
  flex-wrap wrap
  margin -11px -10px
  &__list-item
    margin 11px 10px

@media (max-width 768px)
  .list-wrapper
    width 100%

  .header
    background-color white
    padding 10px 10px
    &__title
      font-size 16px

  .list
    margin 0
    &__list-item
      margin 0
      padding 10px 0
      background-color white
      border-bottom 5px solid #EFEFEF
      width 100%
      &:nth-child(1)
        padding 0 0 10px 0
</style>
