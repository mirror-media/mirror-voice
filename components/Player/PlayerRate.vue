<template>
  <div
    v-click-outside="hidePicker"
    class="rate"
  >
    <p
      class="rate__indicator"
      @click="togglePicker"
    >
      X {{ formatRateDisplay(rate) }}
    </p>
    <ol
      v-show="showPicker"
      class="rate__picker picker"
    >
      <li
        v-for="rateAvailable in ratesAvailable"
        :key="rateAvailable"
        :class="[ 'picker__list-item', { 'picker__list-item--highlight': rateAvailable === rate } ]"
        @click="pickRate(rateAvailable)"
        v-text="formatRateDisplay(rateAvailable)"
      />
    </ol>
  </div>
</template>

<script>
import { ratesAvailable } from './comm/rate'

export default {
  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          // here I check that click was outside the el and his childrens
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  props: {
    rate: {
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
  methods: {
    togglePicker() {
      this.showPicker = !this.showPicker
    },
    hidePicker() {
      this.showPicker = false
    },
    pickRate(rate) {
      this.$emit('rateChange', rate)
      this.hidePicker()
    },
    formatRateDisplay(rate) {
      rate = `${rate}`
      if (rate.length === 1) {
        return `${rate}.0`
      }
      return rate
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
  &__indicator
    min-width 57px
    font-size 18px
    font-weight 600
    color #e5e5e5
    line-height 1
    cursor pointer
    user-select none
  &__picker
    position absolute
    bottom calc(100% + 3px)
    width 52px
    background-color #313131
    border-radius 2px

.picker
  list-style none
  margin 0
  padding 20px 13px
  &__list-item
    color white
    line-height 1.29
    cursor pointer
    &--highlight
      color #d84939
    & + &
      margin 17px 0 0 0
</style>
