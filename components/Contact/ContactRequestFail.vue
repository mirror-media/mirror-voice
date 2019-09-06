<template>
  <AppDiv class="fail-wrapper">
    <AppH1 :size="'large'">
      訊息傳送失敗
    </AppH1>
    <p>
      麻煩重新再次填寫訊息欄位，謝謝！
    </p>
    <ContactButton
      @click.native="$emit('backToFormFromFail')"
    >
      回前頁
    </ContactButton>
    <img
      class="fail-wrapper__img"
      src="~/assets/img/robot_404_half.png"
      alt=""
    >
  </AppDiv>
</template>

<script>
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import ContactButton from '~/components/Contact/ContactButton.vue'

export default {
  components: {
    AppDiv,
    AppH1,
    ContactButton
  }
}
</script>

<style lang="stylus" scoped>
.fail-wrapper
  position relative
  p
    margin 24px 0 0 0
    color #7d7d7d
  button
    margin 30px 0 0 0
  &__img
    position absolute
    bottom 0
    right 23px
    width 202px

@media (max-width 768px)
  .fail-wrapper
    &__img
      display none
</style>
