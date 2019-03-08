<template>
  <div class="wrapper">
    <img
      class="wrapper__close"
      src="~/assets/img/close.png"
      alt=""
      @click="$emit('close')"
    >
    <img
      class="wrapper__robot"
      src="~/assets/img/robot_native_notification.png"
      alt=""
    >
    <div class="wrapper__info info">
      <p class="info__hint">
        使用 app 聽更順手，是否在 app 中開啟？
      </p>
      <div class="info__buttons buttons">
        <a
          class="buttons__button"
          href=""
        >
          在 app 中開啟
        </a>
        <a
          class="buttons__button"
          href=""
        >
          我要下載 app
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.wrapper
  display none

@media (max-width 768px)
  .wrapper
    z-index 1000
    position relative
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    padding 36px 0
    position fixed
    bottom 0
    left 0
    width 100%
    height 320px
    background-color #d84939
    &__close
      position absolute
      right 16px
      top 16px
      width 14px
      height 14px
    &__robot
      width 77px
      height 123px

  .info
    &__hint
      font-size 17px
      color white
    &__buttons
      margin 26px 0 0 0

  .buttons
    display flex
    justify-content space-between
    &__button
      width 150px
      height 40px
      background-color #273947
      border none
      color #e6e6e6
      font-size 15px
      display flex
      justify-content center
      align-items center
</style>
