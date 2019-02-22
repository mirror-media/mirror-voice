<template>
  <div class="date">
    <img class="date__icon" src="~/assets/img/icon_time.png" alt="">
    <p class="date__text">
      {{ dateFormatted }}
    </p>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    date: {
      type: Date,
      default() {
        return new Date()
      }
    }
  },
  computed: {
    dateFormatted() {
      return dayjs(this.date).format('YYYY/MM/DD')
    }
  }
}
</script>

<style lang="stylus" scoped>
.date
  display flex
  align-items center
  &__icon
    height 14px
  &__text
    font-size 14px
    color #7d7d7d
    margin 0 0 0 10px
</style>
