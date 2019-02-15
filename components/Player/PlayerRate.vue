<template>
  <div
    v-click-outside="hidePicker"
    class="rate"
  >
    <p
      class="rate__indicator"
      @click="togglePicker"
    >
      X {{ formatRateDisplay(rateCurrent) }}
    </p>
    <ol
      v-show="showPicker"
      :class="[ 'rate__picker', `rate__picker--${type}`, 'picker' ]"
    >
      <li
        v-for="rate in rateAvailable"
        :key="rate"
        :class="[ 'picker__list-item', { 'picker__list-item--highlight': rate === rateCurrent } ]"
        @click="pickRate(rate)"
        v-text="formatRateDisplay(rate)"
      />
    </ol>
  </div>
</template>

<script>
import { rateAvailable } from './comm/rate'

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
    type: {
      type: String,
      default: 'short',
      validator(value) {
        return ['short', 'long'].includes(value)
      }
    },
    rateCurrent: {
      type: Number,
      default: 1.0,
      validator(value) {
        return rateAvailable.includes(value)
      }
    }
  },
  data() {
    return {
      rateAvailable: rateAvailable,
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
      this.$emit('update:rateCurrent', rate)
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
    min-width 55px
    font-size 18px
    font-weight 600
    color #e5e5e5
    line-height 1
    cursor pointer
    user-select none
  &__picker
    position absolute
    width 52px
    background-color #313131
    border-radius 2px
    &--short
      bottom calc(100% + 3px + 16px)
    &--long
      bottom calc(100% + 3px)

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
