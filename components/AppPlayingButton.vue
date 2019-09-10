<template>
  <div class="toggle-play">
    <img class="toggle-play__icon" src="~/assets/img/btn_play.png" alt="">
    <span class="toggle-play__text">
      <slot>全部播放</slot>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.toggle-play
  display inline-flex
  align-items center
  height 36px
  cursor pointer
  &__icon
    width 36px
    height 36px
  &__text
    margin 0 0 0 16px
    font-size 18px
    color #d84939
</style>
