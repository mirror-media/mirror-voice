<template>
  <div class="icon">
    <div class="icon__bar" />
    <div class="icon__bar" />
    <div class="icon__bar" />
    <div class="icon__bar" />
  </div>
</template>

<style lang="stylus" scoped>
.icon
  display flex
  transform rotate(180deg)
  &__bar
    width 4px
    border-radius 1px
    background-color #d84939
    &:nth-child(1)
      height 9px
    &:nth-child(2)
      height 16px
    &:nth-child(3)
      height 12px
    &:nth-child(4)
      height 6px
    & + &
      margin 0 0 0 1px
</style>
