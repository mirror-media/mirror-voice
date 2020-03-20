<template>
  <div class="info">
    <nuxt-link
      class="info__title info__title--truncate"
      :to="to"
      v-text="text"
    />
    <div class="info__time info__title--fixed-width">
      <span
        class="time-current"
        v-text="timeCurrentFormatted"
      />
      <span
        class="separator"
        v-text="separator"
      />
      <span
        class="time-total"
        v-text="timeTotalFormatted"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    },
    text: {
      type: String,
      default: ''
    },
    timeTotal: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    timeCurrent: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    }
  },
  data() {
    return {
      separator: '/'
    }
  },
  computed: {
    timeTotalFormatted() {
      return this.$secondsToHms(this.timeTotal)
    },
    timeCurrentFormatted() {
      return this.$secondsToHms(this.timeCurrent)
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  display flex
  justify-content space-between
  font-size 12px
  &__title
    line-height 1
    color #e5e5e5
    display block
    width 0px
    flex 1 1 auto
    &--truncate
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  &__time
    line-height 1
    color #e5e5e5
    &--fixed-width
      min-width max-content
      margin 0 0 0 5px

.separator, .time-total
  color #7d7d7d

@media (max-width 768px)
  .info
    font-size 11px

  .separator, .time-total
    display none
</style>
