<template>
  <div
    v-click-outside="hidePicker"
    class="rate"
  >
    <button
      class="button-toggler"
      @click="togglePicker"
      v-text="playbackRateCurrentIndicator"
    />
    <ol
      v-show="showPicker"
      class="picker rate__picker"
    >
      <li
        v-for="rate in ratesAvailable"
        :key="rate"
        :class="[
          'picker__list-item',
          { 'active': rate === playbackRateCurrent }
        ]"
        @click="pickRate(rate)"
        v-text="formatRateDisplay(rate)"
      />
    </ol>
  </div>
</template>

<script>
import _ from 'lodash'
import { ratesAvailable } from './comm/rate'

export default {
  props: {
    playbackRateCurrent: {
      type: Number,
      default: 1.0,
      validator(value) {
        return ratesAvailable.includes(value)
      }
    }
  },
  data() {
    return {
      ratesAvailable,
      showPicker: false
    }
  },
  computed: {
    playbackRateCurrentIndicator() {
      const playbackRateFloat = this.formatRateDisplay(this.playbackRateCurrent)
      return `X ${playbackRateFloat}`
    }
  },
  methods: {
    togglePicker() {
      this.showPicker = !this.showPicker
    },
    hidePicker() {
      this.showPicker = false
    },
    formatRateDisplay(rate) {
      const rateString = rate.toString()
      return _.padEnd(rateString, 3, '.0')
    },
    pickRate(rate) {
      this.$emit('update:playbackRateCurrent', rate)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rate
  height 100%
  display flex
  justify-content center
  align-items center
  position relative
  &__picker
    position absolute
    bottom calc(100% + 3px)
    width 52px
    background-color #313131
    border-radius 2px

.button-toggler
  min-width 57px
  font-size 18px
  font-weight 600
  color #e5e5e5
  line-height 1
  cursor pointer
  user-select none
  background-color transparent
  border none
  padding 0
  outline none

.picker
  list-style none
  margin 0
  padding 20px 13px
  &__list-item
    color white
    line-height 1.29
    cursor pointer
    &.active
      color #d84939
    & + &
      margin 17px 0 0 0

@media (max-width 768px)
  .button-toggler
    min-width 50px
    font-size 15px
    text-align left
</style>
