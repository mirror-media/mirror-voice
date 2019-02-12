<template>
  <div class="slider-wrapper">
    <no-ssr>
      <vue-slider
        ref="slider"
        class="slider-wrapper__slider"
        v-bind="options"
        v-model="value"
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
  watch: {
    value() {
      this.$emit('valueChanged', this.value)
    }
  },
  data() {
    return {
      value: 100,
      options: {
        direction: 'vertical',
        width: 4,
        height: 126,
        min: 0,
        max: 100,
        tooltip: false,
        bgStyle: {
          backgroundColor: 'black'
        },
        dotSize: 12,
        sliderStyle: {
          backgroundColor: '#eeeeee'
        },
        processStyle: {
          backgroundColor: '#d84939'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider-wrapper
  &__slider
    cursor pointer
</style>
