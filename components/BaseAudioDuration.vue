<template>
  <span class="duration-wrapper">
    <lazy-component>
      <audio
        ref="audio"
        :src="audio"
        preload="metadata"
        class="duration-wrapper__audio"
        @durationchange="handleDurationchange"
      />
    </lazy-component>
    <span
      class="duration-wrapper__text"
      v-text="durationFormatted"
    />
  </span>  
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    audio: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      duration: 0
    }
  },
  computed: {
    durationFormatted() {
      return this.$secondsToHms(this.duration, { pad: { h: 1 } })
    }
  },
  methods: {
    handleDurationchange(el) {
      this.duration = _.get(el, ['target', 'duration'], 0)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
