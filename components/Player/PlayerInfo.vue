<template>
  <div class="info">
    <template v-if="showTitle">
      <p class="info__first">
        {{ title }}
      </p>
      <p class="info__second">
        <span>{{ secondsToHms(played) }}</span> / {{ secondsToHms(duration) }}
      </p>
    </template>
    <template v-else>
      <p class="info__first">
        {{ secondsToHms(played) }}
      </p>
      <p class="info__second">
        {{ secondsToHms(duration) }}
      </p>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    sound: {
      type: Object,
      required: true,
      validator(sound) {
        return !!sound.src
      }
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    played: {
      type: Number,
      default: 0
    }
  },
  computed: {
    title() {
      return _.get(this.sound, 'title', '')
    }
  },
  methods: {
    secondsToHms(d) {
      d = Number(d)
      const h = Math.floor(d / 3600)
      const m = Math.floor((d % 3600) / 60)
      const s = Math.floor((d % 3600) % 60)

      const hDisplay = h > 0 ? `${h}`.padStart(2, '0') : '00'
      const mDisplay = m > 0 ? `${m}`.padStart(2, '0') : '00'
      const sDisplay = s > 0 ? `${s}`.padStart(2, '0') : '00'
      return `${hDisplay}:${mDisplay}:${sDisplay}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  display flex
  justify-content space-between
  font-size 12px
  &__first
    line-height 1
    color #e5e5e5
  &__second
    line-height 1
    color #7d7d7d
    span
      color #e5e5e5
</style>
