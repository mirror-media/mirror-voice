<template>
  <AppDiv class="anchor-relateds-wrapper">
    <AppH1 class="anchor-relateds-wrapper__title">
      主播其他作品（{{ total }}）
    </AppH1>
    <ul class="anchor-relateds-wrapper__album-list album-list">
      <li
        v-for="(item, i) in listItems"
        :key="i"
        class="album-list__list-item"
      >
        <nuxt-link :to="`/album/${item.name}`">
          <figure class="album-list-figure">
            <img
              class="album-list-figure__img"
              :src="getImgUrl(item)"
              alt=""
            >
            <figcaption class="album-list-figure__figcaption">
              {{ truncate(item.title) }}
            </figcaption>
          </figure>
        </nuxt-link>
      </li>
    </ul>
  </AppDiv>
</template>

<script>
import _ from 'lodash'

import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'

export default {
  components: {
    AppDiv,
    AppH1
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      limitFigcaption: 16
    }
  },
  computed: {
    total() {
      return _.get(this.data, ['meta', 'total'], 0)
    },
    listItems() {
      return _.get(this.data, 'items', [])
    }
  },
  methods: {
    truncate(text) {
      return _.truncate(text, { length: this.limitFigcaption })
    },
    getImgUrl(item) {
      return _.get(this.$getImgs(item), ['mobile', 'url'], '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.anchor-relateds-wrapper
  &__album-list
    margin 21px 0 0 0 !important

.album-list
  list-style none
  margin 0
  padding 0
  &__list-item
    & + &
      margin 17px 0 0 0

.album-list-figure
  display flex
  align-items center
  &__img
    d = 70px
    width d
    min-width d
    height d
    min-height d
    object-fit cover
  &__figcaption
    margin 0 0 0 16px
    font-size 16px
    line-height 1.38
    color black
</style>
