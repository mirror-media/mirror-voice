<template>
  <select class="select">
    <slot />
  </select>
</template>

<style lang="stylus" scoped>
.select
  background-color #eeeeee
  border none
  border-radius 4px
  min-width 270px
  height 40px
  padding 12px 17px
  color #7d7d7d
  &:focus
    outline none

@media (max-width 768px)
  .select
    padding 0 17px
    font-size 13px
</style>
