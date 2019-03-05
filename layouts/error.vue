<template>
  <div class="error">
    <template v-if="statusCode === 404">
      <div class="error__wrapper error__wrapper--404">
        <div class="error__info info">
          <h1 class="info__status-code">
            404
          </h1>
          <p class="info__hint">
            此頁面不存在
          </p>
          <nuxt-link
            class="info__button"
            to="/"
          >
            回首頁
          </nuxt-link>
        </div>
        <img
          class="robot robot--404"
          src="~/assets/img/robot_404.png"
          alt=""
        >
      </div>
    </template>
    <template v-else-if="statusCode === 500">
      <div class="error__wrapper error__wrapper--500">
        <div class="error__info info">
          <h1 class="info__status-code">
            500
          </h1>
          <p class="info__hint">
            系統忙碌中，請重新整理或稍後再試
          </p>
          <a
            class="info__button"
            href=""
          >
            重新整理
          </a>
        </div>
        <img
          class="robot robot--500"
          src="~/assets/img/robot_500.png"
          alt=""
        >
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  }
}
</script>

<style lang="stylus" scoped>
.error
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color #df4c3c
  display flex
  justify-content center
  align-items center
  &__wrapper
    display flex
    &--404
      width 1242px
      justify-content space-between
      align-items center
      padding 0 0 0 172px
    &--500
      width 450px
      flex-direction column
      align-items center
      position absolute
      bottom 0

.info
  display flex
  flex-direction column
  align-items center
  &__status-code
    font-size 96px
    font-weight 900
    line-height 1
    letter-spacing 15.4px
    position relative
    left calc(15.5px / 2)
    text-align center
    color white
    margin 0
  &__hint
    font-size 21px
    line-height 1.33
    letter-spacing 4.2px
    text-align center
    color #ffffff
    margin 43px 0 0 0
  &__button
    width 245px
    height 68px
    background-color #273947
    border none
    color #e6e6e6
    font-size 21px
    letter-spacing 4.2px
    display flex
    justify-content center
    align-items center
    margin 67px 0 0 0

.robot
  &--404
    height 349px
  &--500
    width 360px
    margin 63px 0 0 0
</style>
