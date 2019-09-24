<template>
  <footer
    :class="[
      'footer',
      { 'footer--higher': showAppPlayer }
    ]"
  >
    <nav class="footer__main-navs main-navs">
      <nuxt-link
        class="main-navs__nav"
        to="/privacy_rule"
      >
        隱私政策
      </nuxt-link>
      <nuxt-link
        class="main-navs__nav"
        to="/about"
      >
        關於我們
      </nuxt-link>
    </nav>
    <nav class="footer__external-navs external-navs">
      <a
        href="https://www.mirrormedia.mg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="external-navs__logo"
          src="~/assets/img/revamp/mirrorvoice_media@2x.png"
          alt=""
        >
      </a>
      <a
        href="https://www.mirrorfiction.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="external-navs__logo"
          src="~/assets/img/revamp/mirrorfiction_logo@2x.png"
          alt=""
        >      
      </a>
    </nav>
    <div class="footer__rights rights">
      <p>Copyright © 2019 精鏡傳媒股份有限公司 <span>All Rights Reserved.</span></p>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      showAppPlayer: state => state.appPlayer.showAppPlayer
    })
  }
}
</script>

<style lang="stylus" scoped>
.footer
  border-top 2px solid #FE5000
  height 60px
  background-color white
  display flex
  justify-content space-between
  align-items center
  padding 0 83px
  &--higher
    height calc(60px + 60px)
    padding 0 83px 60px 83px

.main-navs
  display flex
  align-items center
  a
    font-size 15px
    color #1E170F
    display flex
    align-items center
  a + a
    &:before
      content ''
      display inline-block
      width 3px
      height 3px
      border-radius 100%
      background-color #1E170F
      margin 0 10px
      pointer-events none

.external-navs
  display none

.rights
  font-size 13px
  color #6F6F6F
  span
    font-size 12px

@media (max-width 768px)
  .footer
    height 152px
    padding 16px 0 10px 0
    flex-direction column
    &--higher
      height calc(152px + 60px)
      padding 16px 0 70px 0
    &__external-navs
      margin 20px 0 0 0
    &__rights
      margin 20px 0 0 0

  .main-navs
    a + a
      margin 0 0 0 14px
      &:before
       display none

  .external-navs
    display flex
    &__logo
      height 32px
    a + a
      margin 0 0 0 20px

  .rights
    display flex
    flex-direction column
    align-items center
    span
      display block
      text-align center
      margin 5px 0 0 0
</style>
