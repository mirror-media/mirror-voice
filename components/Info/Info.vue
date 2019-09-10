<template>
  <div class="info-wrapper">
    <div
      v-if="layout !== 'single'"
      class="info-wrapper__cover cover"
    >
      <img
        v-if="imgUrl !== ''"
        :key="imgUrl"
        v-lazy="imgUrl"
        class="cover__img"
        alt=""
      >
    </div>
    <div
      :class="`info-wrapper__info info info--${layout}`"
    >
      <AppH1
        class="info__title"
        :size="'large'"
        :weight="'bold'"
      >
        {{ info.title }}
      </AppH1>
      <AppDate
        :class="[
          'info__date',
          `info__date--${layout}`
        ]"
        :date="date"
      />
      <div class="info__basic basic">
        <div
          v-if="vocals.length > 0"
          class="basic__row vocals"
        >
          <p>主播：</p>
          <template
            v-for="(vocal, i) in vocals"
          >
            <p
              :key="`${i}-vocal`"
              class="vocals__vocal"
              v-text="getName(vocal)"
            />
            <p
              v-if="i < vocals.length - 1"
              :key="`${i}-delimiter`"
              class="vocals__delimiter"
            >
              、
            </p>
          </template>
        </div>
        <div
          v-if="writers.length > 0"
          class="basic__row writers"
        >
          <p>原著：</p>
          <template
            v-for="(writer, i) in writers"
          >
            <p
              :key="`${i}-writer`"
              class="writers__writer"
              v-text="getName(writer)"
            />
            <p
              v-if="i < writers.length - 1"
              :key="`${i}-delimiter`"
              class="writer__delimiter"
            >
              、
            </p>
          </template>
        </div>
      </div>
      <div
        v-if="layout === 'album'"
        class="info__toggle-play toggle-play"
        @click="$emit('clickPlay')"
      >
        <img class="toggle-play__icon" src="~/assets/img/btn_play.png" alt="">
        <span class="toggle-play__text">
          全部播放
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import AppH1 from '~/components/AppH1.vue'
import AppDate from '~/components/AppDate.vue'

export default {
  components: {
    AppH1,
    AppDate
  },
  props: {
    layout: {
      type: String,
      default: 'single',
      validator(value) {
        return ['single', 'album'].includes(value)
      }
    },
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      return new Date(_.get(this.info, 'updatedAt', ''))
    },
    tags() {
      return _.get(this.info, 'tags', [])
    },
    imgUrl() {
      return _.get(this.$getImgs(this.info), ['mobile', 'url'], '')
    },
    vocals() {
      return _.get(this.info, 'vocals', [])
    },
    writers() {
      return _.get(this.info, 'writers', [])
    }
  },
  methods: {
    getName(person) {
      return _.get(person, 'name', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.info-wrapper
  display flex
  &__cover
    min-width 188px
    max-width 188px
    min-height 188px
    max-height 188px
    margin 0 22px 0 0

.cover
  &__img
    width 100%
    height 100%
    object-fit cover

.info
  width 100%
  position relative
  display flex
  flex-direction column
  &--album
    min-height 188px
    padding 0 0 54px 0
  &__title
    line-height 1.25
  &__date
    margin 19px 0 0 0
    line-height 1
  &__basic
    margin 16px 0 0 0
  &__toggle-play
    position absolute
    bottom 0
    width 100%

.basic
  display flex
  flex-direction column
  line-height 1.71
  font-size 14px
  color #7d7d7d
  &__row
    display flex
    flex-wrap wrap
    & + &
      margin 10px 0 0 0

.toggle-play
  display inline-flex
  align-items center
  height 36px
  cursor pointer
  &__icon
    width 36px
    height 36px
  &__text
    margin 0 0 0 16px
    font-size 18px
    color #d84939

@media (max-width 768px)
  .info-wrapper
    &__cover
      width 110px
      min-width 110px
      max-width 110px
      height 110px
      min-height 110px
      max-height 110px
      margin 0 15px 0 0

  .info
    padding 0 0 21px 0
    &--album
      min-height 110px
    &__title
      order 0
    &__date
      order 2
      position absolute
      bottom 0
      margin 0
    &__basic
      order 1
      margin 5px 0 0 0

  .basic
    font-size 13px
    &__row
      & + &
        margin 0

  .toggle-play
    display none
</style>
