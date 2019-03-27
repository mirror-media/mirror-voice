<template>
  <div class="icon">
    <div class="icon__bar" />
    <div class="icon__bar" />
    <div class="icon__bar" />
    <div class="icon__bar" />
  </div>
</template>

<style lang="stylus" scoped>
@keyframes barAnimation
  from
    transform scaleY(1)
  to
    transform scaleY(0.5)

.icon
  display flex
  transform rotate(180deg)
  &__bar
    width 4px
    height 16px
    border-radius 1px
    background-color #d84939
    transform-origin 0 0
    transform scaleY(1)
    animation-name barAnimation
    animation-duration 0.5s
    animation-iteration-count infinite
    animation-direction alternate
    animation-timing-function ease-in-out
    &:nth-child(1)
      animation-delay 0s
    &:nth-child(2)
      animation-delay 0.25s
    &:nth-child(3)
      animation-delay 0.5s
    &:nth-child(4)
      animation-delay 0.75s
    & + &
      margin 0 0 0 1px
</style>
