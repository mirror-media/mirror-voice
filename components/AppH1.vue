<template>
  <h1 :class="[ 'h1', `h1--${size}`, `h1--${weight}`]">
    <slot />
  </h1>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.h1
  margin 0
  line-height 1
  & >>> a
    color black !important
  &--large
    font-size 21px
  &--small
    font-size 18px
  &--normal
    font-weight 400
  &--bold
    font-weight 600

@media (max-width 768px)
  .h1
    margin 0
    line-height 1
    & >>> a
      color black !important
    &--large
      font-size 15px
    &--small
      font-size 15px
    &--normal
      font-weight 400
    &--bold
      font-weight 400
</style>
