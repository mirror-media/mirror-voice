<template>
  <AppDiv class="success-wrapper">
    <AppH1 :size="'large'">
      訊息已送出
    </AppH1>
    <p>
      謝謝你的訊息，我們將儘速回覆，謝謝！
    </p>
    <ContactButton
      @click.native="$emit('backToFormFromSuccess')"
    >
      回前頁
    </ContactButton>
    <img
      class="success-wrapper__img"
      src="~/assets/img/robot_500.png"
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
.success-wrapper
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
</style>
