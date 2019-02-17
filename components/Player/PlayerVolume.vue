<template>
  <div
    v-click-outside="hideSlider"
    class="volume"
  >
    <img
      class="volume__icon"
      :src="require(`~/assets/img/btn_volume_${volume <= 0 ? 'min' : 'normal'}.png`)"
      alt=""
      @click="toggleSlider"
    >
    <!-- do not use v-show due to vue-slider-component exception -->
    <!-- see: https://github.com/NightCatSama/vue-slider-component#exceptions -->
    <div
      v-if="showSlider"
      :class="[ 'volume__slider', `volume__slider--${type}`, 'slider' ]"
    >
      <PlayerSlider
        :direction="'vertical'"
        :value="volume"
        @valueChange="v => $emit('volumeChange', v)"
      />
    </div>
  </div>
</template>

<script>
import PlayerSlider from './PlayerSlider.vue'

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
  components: {
    PlayerSlider
  },
  props: {
    type: {
      type: String,
      default: 'short',
      validator(value) {
        return ['short', 'long'].includes(value)
      }
    },
    volume: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 1
      }
    }
  },
  data() {
    return {
      showSlider: false
    }
  },
  methods: {
    toggleSlider() {
      this.showSlider = !this.showSlider
    },
    hideSlider() {
      this.showSlider = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.volume
  height 100%
  display flex
  justify-content center
  align-items center
  position relative
  &__icon
    height 18px
    cursor pointer
  &__slider
    position absolute
    width 52px
    height 164px
    background-color #313131
    border-radius 2px
    &--short
      bottom calc(100% + 3px + 16px)
    &--long
      bottom calc(100% + 3px)

.slider
  display flex
  justify-content center
  align-items center
</style>
