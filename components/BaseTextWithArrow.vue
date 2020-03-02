<template>
  <div
    :class="[
      'wrapper',
      `wrapper--${arrowAt}`
    ]"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout"
  >
    <p
      :class="[
        'wrapper__text',
        { 'wrapper__text--orange': isMouseover }
      ]"
      v-text="text"
    />
    <div
      :class="[
        'wrapper__arrow',
        `wrapper__arrow--${arrowAt}`,
        { 'wrapper__arrow--orange': isMouseover }
      ]"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    arrowAt: {
      type: String,
      default: 'right',
      validator(value) {
        return ['left', 'right'].includes(value)
      }
    }
  },
  data() {
    return {
      isMouseover: false
    }
  },
  methods: {
    handleMouseover() {
      this.isMouseover = true
    },
    handleMouseout() {
      this.isMouseover = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  align-items center
  &--left
    flex-direction row-reverse
  &__text
    font-size 13px
    color #6F6F6F
    &--orange
      color #FF6D2D
  &__arrow
    width 8px
    height 8px
    border-right 2px solid #6F6F6F
    border-bottom 2px solid #6F6F6F
    &--orange
      border-right 2px solid #FF6D2D
      border-bottom 2px solid #FF6D2D
    &--right
      transform rotate(-45deg)
      margin 0 0 0 3px
    &--left
      transform rotate(135deg)
      margin 0 3px 0 0
</style>
