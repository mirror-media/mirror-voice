<template>
  <VueSlider
    v-model="value"
    class="slider"
    :style="{ padding: '0' }"
    :rail-style="{ background }"
    v-bind="options"
  />
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'

export default {
  components: {
    VueSlider
  },
  props: {
    direction: {
      type: String,
      required: true,
      validator(value) {
        return ['horizontal', 'vertical'].includes(value)
      }
    },
    valueBuffered: {
      type: Number,
      default: 0,
      require: true,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    valueCurrent: {
      type: Number,
      default: 0,
      require: true,
      validator(value) {
        return value >= 0 && value <= 1
      }
    }
  },
  computed: {
    value: {
      get() {
        return this.valueCurrent
      },
      set(value) {
        this.$emit('update:valueCurrent', value)
      }
    },
    options() {
      return {
        interval: 0.001,
        direction: this.direction === 'horizontal' ? 'ltr' : 'btt',
        width: this.direction === 'horizontal' ? 'auto' : 4,
        height: this.direction === 'horizontal' ? 4 : 126,
        min: 0,
        max: 1,
        tooltip: 'none',
        dotSize: 12,
        processStyle: {
          backgroundColor: '#d84939'
        }
      }
    },
    background() {
      const buffered = this.valueBuffered * 100
      return `linear-gradient(90deg, #7d7d7d ${buffered}%, black ${buffered}%)`
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  cursor pointer
  position relative
  & >>> .vue-slider-dot
    background-color #eeeeee
    border-radius 100%
    position absolute
  & >>> .vue-slider-rail
    height 100%
</style>
