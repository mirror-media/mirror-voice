<template>
  <div class="info">
    <nuxt-link
      class="info__first info__first--truncate"
      :to="`/single/${slug}`"
    >
      {{ title }}
    </nuxt-link>
    <p class="info__second info__second--fixed-width">
      {{ secondsToHms(played) }}<span> / {{ secondsToHms(duration) }}</span>
    </p>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    sound: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    played: {
      type: Number,
      default: 0
    }
  },
  computed: {
    title() {
      return _.get(this.sound, 'title', '')
    },
    slug() {
      return _.get(this.sound, 'slug', '')
    }
  },
  methods: {
    secondsToHms(d) {
      d = Number(d)
      const h = Math.floor(d / 3600)
      const m = Math.floor((d % 3600) / 60)
      const s = Math.floor((d % 3600) % 60)

      const hDisplay = h > 0 ? `${h}`.padStart(2, '0') : '00'
      const mDisplay = m > 0 ? `${m}`.padStart(2, '0') : '00'
      const sDisplay = s > 0 ? `${s}`.padStart(2, '0') : '00'
      return `${hDisplay}:${mDisplay}:${sDisplay}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  display flex
  justify-content space-between
  font-size 12px
  &__first
    line-height 1
    color #e5e5e5
    &--truncate
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  &__second
    line-height 1
    color #e5e5e5
    span
      color #7d7d7d
    &--fixed-width
      min-width max-content
      margin 0 0 0 5px

@media (max-width 768px)
  .info
    font-size 11px
    &__second
      span
        display none
</style>
