<template>
  <div class="slider-wrapper">
    <no-ssr>
      <vue-slider
        v-model="internalValue"
        class="slider-wrapper__slider"
        :style="{ padding: '0' }"
        :bg-style="{ background: bgStyleBackground }"
        v-bind="options"
        @callback="v => $emit('valueChange', v)"
      />
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'

const components = {
  'no-ssr': NoSSR
}
if (process.browser) {
  const VueSlider = require('vue-slider-component')
  components['vue-slider'] = VueSlider
}

export default {
  components,
  props: {
    direction: {
      type: String,
      required: true,
      validator(value) {
        return ['horizontal', 'vertical'].includes(value)
      }
    },
    buffered: {
      type: Number,
      default: 0,
      require: true,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    value: {
      type: Number,
      default: 0,
      require: true,
      validator(value) {
        return value >= 0 && value <= 1
      }
    }
  },
  data() {
    return {
      internalValue: this.value,
      options: {
        interval: 0.1,
        direction: this.direction,
        width: this.direction === 'vertical' ? 4 : 'auto',
        height: this.direction === 'vertical' ? 126 : 4,
        min: 0,
        max: 1,
        tooltip: false,
        dotSize: 12,
        sliderStyle: {
          backgroundColor: '#eeeeee'
        },
        processStyle: {
          backgroundColor: '#d84939'
        }
      }
    }
  },
  computed: {
    bgStyleBackground() {
      return `linear-gradient(90deg, #7d7d7d ${this.buffered}%, black ${
        this.buffered
      }%)`
    }
  },
  watch: {
    value() {
      this.internalValue = this.value
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider-wrapper
  &__slider
    cursor pointer
</style>
