<template>
  <div class="slider-wrapper">
    <no-ssr>
      <vue-slider
        ref="slider"
        v-model="internalValue"
        class="slider-wrapper__slider"
        :style="{ padding: '0' }"
        v-bind="options"
        :bg-style="{ background: bgStyleBackground }"
        @callback="onSeek"
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
      internalBuffered: this.buffered * 100,
      internalValue: this.value * 100,
      options: {
        direction: this.direction,
        width: this.direction === 'vertical' ? 4 : 'auto',
        height: this.direction === 'vertical' ? 126 : 4,
        min: 0,
        max: 100,
        tooltip: false,
        dotSize: 12,
        // bgStyle: {
        //   // backgroundColor: 'black'
        //   background: 'linear-gradient(90deg, #7d7d7d 50%, black 50%)'
        // },
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
      return `linear-gradient(90deg, #7d7d7d ${this.internalBuffered}%, black ${
        this.internalBuffered
      }%)`
    }
  },
  watch: {
    internalValue() {
      this.$emit('update:value', this.internalValue / 100)
    },

    buffered() {
      this.internalBuffered = this.buffered * 100
    },
    value() {
      this.internalValue = this.value * 100
    }
  },
  methods: {
    onSeek(value) {
      this.$emit('seek', value / 100)
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider-wrapper
  &__slider
    cursor pointer
</style>
