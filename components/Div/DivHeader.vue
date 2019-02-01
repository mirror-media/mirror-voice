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
      {{ title }}
    </AppH1>
    <slot>
      <p class="header__more">{{ subTitle }}</p>
    </slot>
  </header>
</template>

<script>
import AppH1 from '~/components/AppH1.vue'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
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
    subTitle: {
      type: String,
      default: '更多'
    },
    alignItems: {
      type: String,
      default: 'center'
    }
  },
  components: {
    AppH1
  }
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  justify-content space-between
  &__title
    cursor pointer
  &__more
    font-size 14px
    color #7d7d7d
    cursor pointer
</style>
