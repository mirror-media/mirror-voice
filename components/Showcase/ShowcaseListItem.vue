<template>
  <li
    :class="[
      'list-item',
      `list-item--${layout}`,
      { 'list-item--hover': isMouseover && layout === 'horizontal' }
    ]"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <div
      :class="[
        'list-item__cover',
        `list-item__cover--${layout}`,
        'cover'
      ]"
    >
      <img
        v-if="imgUrl !== ''"
        :key="imgUrl"
        v-lazy="imgUrl"
        :class="[
          'cover__img',
          { 'cover__img--dimmed': isMouseover }
        ]"
        alt=""
      >
      <img
        :class="[
          'cover__play-icon',
          { 'cover__play-icon--show': isMouseover }
        ]"
        src="~/assets/img/btn_play.png"
        alt=""
      >
    </div>
    <div
      :class="[
        'list-item__info',
        `list-item__info--${layout}`,
        'info'
      ]"
    >
      <nuxt-link :to="`/${toRoute}/${item.name}`" @click.native.stop>
        <h1 class="info__title">
          {{ title }}
        </h1>
      </nuxt-link>
      <p
        :class="[
          'info__vocal',
          `info__vocal--${layout}`
        ]"
      >
        {{ vocal }}
      </p>
      <AppDate
        v-if="layout === 'horizontal'"
        class="info__date"
        :date="date"
      />
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'

import _ from 'lodash'
import AppDate from '~/components/AppDate.vue'

export default {
  components: {
    AppDate
  },
  props: {
    layout: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    toRoute: {
      type: String,
      default: 'album',
      required: true
    }
  },
  data() {
    return {
      limitTitleDesktop: {
        vertical: 22,
        horizontal: 28
      },
      limitTitleMobile: {
        vertical: 22,
        horizontal: 38
      },
      limitVocal: 16,
      isMouseover: false
    }
  },
  computed: {
    ...mapState({
      isDesktop: state => _.get(state, ['appUA', 'ua', 'isDesktop'], true)
    }),
    title() {
      const limit = this.isDesktop
        ? this.limitTitleDesktop[this.layout]
        : this.limitTitleMobile[this.layout]
      return _.truncate(this.item.title, { length: limit })
    },
    date() {
      return new Date(_.get(this.item, 'updatedAt', ''))
    },
    imgUrl() {
      return _.get(this.$getImgs(this.item), ['mobile', 'url'], '')
    },
    imgResizedTargets() {
      return _.get(this.item, ['heroImage', 'image', 'resizedTargets'], {})
    },
    vocal() {
      const vocalName = _.get(this.item, ['vocals', 0, 'name'], '')
      return _.truncate(vocalName, { length: this.limitVocal })
    }
  },
  methods: {
    onMouseover() {
      this.isMouseover = true
    },
    onMouseout() {
      this.isMouseover = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  background-color white
  display flex
  cursor pointer
  &--vertical
    width 120px
    flex-direction column
  &--horizontal
    width 310px
    padding 14px
    flex-direction row
  &--hover
    background-color #f5f5f5
  &__cover
    d = 120px
    width d
    min-width d
    height d
    min-height d
  &__info
    &--vertical
      margin 13px 0 0 0
    &--horizontal
      margin 0 0 0 15px

.cover
  display flex
  justify-content center
  align-items center
  position relative
  &__img
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    object-fit cover
    transition filter .1s ease-out
    &--dimmed
      filter brightness(50%)
  &__play-icon
    d = 48px
    width d
    height d
    z-index 2
    opacity 0
    &--show
      opacity 1
      animation-name bounceIn
      animation-duration 0.5s

.info
  position relative
  &__title
    font-size 16px
    font-weight 600
    line-height 1.38
    margin 0
    color black
    &:hover
      color #d84939
  &__vocal
    font-size 14px
    line-height 1.29
    color #7d7d7d
    margin 8px 0 0 0
  &__date
    position absolute
    bottom 0

@media (max-width 768px)
  .list-item
    &--vertical
      width calc((100vw - 18px * 4) / 3)
    &--horizontal
      width 100%
      padding 0
    &--hover
      background-color #f5f5f5
    &__cover
      &--vertical
        d = calc((100vw - 18px * 4) / 3)
        width d
        min-width d
        height d
        min-height d
      &--horizontal
        d = 80px
        width d
        min-width d
        height d
        min-height d
    &__info
      &--vertical
        margin 10px 0 0 0
      &--horizontal
        margin 0
        padding 5px 15px

  .cover
    &__img
      &--dimmed
        filter brightness(100%)
    &__play-icon
      &--show
        opacity 0

  .info
    position relative
    &__title
      font-size 13px
      font-weight 400
      line-height 1.31
    &__vocal
      font-size 11px
      line-height 1.64
      margin 5px 0 0 0
      &--horizontal
        font-size 13px
    &__date
      position absolute
      bottom 5px
</style>
