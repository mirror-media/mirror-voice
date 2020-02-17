<template>
  <li class="list-item">
    <div
      :class="[
        'list-item__cover-wrapper',
        'cover-wrapper',
        `cover-wrapper--${imgSize}`
      ]"
    >
      <div
        class="cover-wrapper__play-icon-wrapper play-icon-wrapper"
        @click="$emit('clickPlayIconWrapper')"
      >
        <img
          class="play-icon-wrapper__img"
          src="~/assets/img/revamp/play-circle.svg"
          alt=""
        >
      </div>
      <img
        v-lazy="imgSrc"
        alt=""
        class="cover-wrapper__img"
      >
    </div>
    <nuxt-link
      :class="[
        'list-item__info-wrapper',
        'info-wrapper',
        { 'info-wrapper--space-between': showInfoMeta }
      ]"
      :to="to"
    >
      <div class="info-wrapper__info-texts info-texts">
        <h1
          v-if="title && title !== ''"
          :class="[
            'info-texts__title',
            { 'info-texts__title--less-margin': showInfoMeta },
            { 'info-texts__title--marginless': haveContent },
            { 'info-texts__title--bigger': haveContent },
            { 'info-texts__title--orange-mobile': haveContent },
            { 'info-texts__title--weight-normal-mobile': haveContent }
          ]"
          v-text="title"
        />
        <h2
          v-if="subtitle && subtitle !== ''"
          :class="[
            'info-texts__subtitle',
            { 'info-texts__subtitle--margin-bottom': haveContent },
            { 'info-texts__subtitle--bold-mobile': haveContent }
          ]"
          v-text="subtitle"
        />
        <div
          v-if="content && content !== ''"
          class="info-texts__content"
          v-html="content"
        />
      </div>
      <div
        v-show="showInfoMeta"
        class="info-wrapper__info-metas info-metas"
      >
        <div class="info-metas__remaining-duration remaining-duration">
          剩餘 {{ memorizedRemainingDurationSecondsFormatted }}
        </div>
        <span
          class="info-metas__date"
          v-text="memorizedDateFormatted"
        />
      </div>
    </nuxt-link>
  </li>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    imgSize: {
      type: String,
      default: 'smaller',
      validator(value) {
        return ['smaller', 'bigger'].includes(value)
      }
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    content: {
      required: true,
      validator(value) {
        return typeof value === 'string' || value === undefined
      }
    },
    to: {
      type: String,
      required: true
    },
    memorizedRemainingDurationSeconds: {
      type: Number,
      default: -1
    },
    memorizedDate: {
      type: [Date, String],
      default: ''
    }
  },
  computed: {
    haveContent() {
      return this.content !== undefined
    },
    showInfoMeta() {
      return this.memorizedRemainingDurationSeconds >= 0
    },
    memorizedRemainingDurationSecondsFormatted() {
      return this.$secondsToHms(this.memorizedRemainingDurationSeconds)
    },
    memorizedDateFormatted() {
      return dayjs(this.memorizedDate).format('YYYY.MM.DD')
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  padding-bottom 10.5px
  &__info-wrapper
    margin 0 0 0 10.5px

.cover-wrapper
  position relative
  &--smaller
    width 100px
    height 100px
    min-width 100px
    min-height 100px
  &--bigger
    width 120px
    height 120px
    min-width 120px
    min-height 120px
  &__play-icon-wrapper
    position absolute
    left 0
    top 0
    width 100%
    height 100%
  &__img
    width 100%
    min-width 100%
    height 100%
    min-height 100%
    border-radius 5px
    object-fit cover

.play-icon-wrapper
  display flex
  justify-content center
  align-items center
  cursor pointer
  &__img
    width 24px
    height 24px

.info-wrapper
  display flex
  align-items center

.info-texts
  &__title
    margin 0 0 10px 0
    font-size 13px
    font-weight normal
    color #FF6D2D
    word-wrap break-word
    -webkit-line-clamp 1
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden
    &--bigger
      font-size 15px
    &--marginless
      margin 0
  &__subtitle
    margin 0
    font-size 15px
    font-weight bold
    line-height 1.4
    text-align justify
    color #2E2526
    word-wrap break-word
    -webkit-line-clamp 2
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden
    &--smaller
      font-size 14px
    &--margin-bottom
      margin 0 0 3px 0
  &__content
    font-size 14px
    color black
    line-height 1.4
    word-wrap break-word
    -webkit-line-clamp 3
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden

.info-metas
  display none

@media (max-width 768px)
  .cover-wrapper
    width 80px
    height 80px
    min-width 80px
    min-height 80px

  .info-wrapper
    display flex
    flex-direction column
    justify-content center
    flex 1 1 auto
    width 0
    &--space-between
      justify-content space-between

  .info-texts
    width 100%
    &__title
      font-size 15px
      font-weight bold
      color #2E2526
      &--less-margin
        margin 0 0 5px 0
      &--orange-mobile
        color #FF6D2D
      &--weight-normal-mobile
        font-weight normal
    &__subtitle
      font-size 14px
      font-weight normal
      color #2E2526
      width 100%
      &--bold-mobile
        font-weight bold

  .info-metas
    display flex
    justify-content space-between
    align-items center
    width 100%
    &__remaining-duration
      width 80px
      height 16px
      background-color #B8B8B8
      font-size 10px
      color white
      display flex
      justify-content center
      align-items center
      border-radius 12px
    &__date
      font-size 10px
      color #B8B8B8
</style>
