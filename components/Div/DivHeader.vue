<template>
  <header
    class="header"
    :style="{ alignItems: alignItems }"
  >
    <AppH1
      class="header__title"
      :size="size"
      :weight="weight"
    >
      <slot name="left" />
    </AppH1>
    <slot name="right" />
  </header>
</template>

<script>
import AppH1 from '~/components/AppH1.vue'

export default {
  components: {
    AppH1
  },
  props: {
    size: {
      type: String,
      default: 'small',
      validator(value) {
        return ['large', 'small'].includes(value)
      }
    },
    weight: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'bold'].includes(value)
      }
    },
    alignItems: {
      type: String,
      default: 'center'
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  justify-content space-between
</style>
