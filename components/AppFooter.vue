<template>
  <footer
    :class="[
      'footer',
      { 'footer--higher': showAppPlayer }
    ]"
  >
    <div class="footer__top top">
      <div class="top__wrapper">
        <nav class="top__mobile-external-link-navs mobile-external-link-navs">
          <a
            class="mobile-external-link-navs__nav"
            :href="externalLinks.mirrormedia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="mobile-mm-logo"
              src="~/assets/img/revamp/mirrorvoice_media@2x.png"
              alt=""
            >
          </a>
          <a
            class="mobile-external-link-navs__nav"
            :href="externalLinks.mirrorfiction"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="mobile-mf-logo"
              src="~/assets/img/revamp/mirrorfiction_logo@2x.png"
              alt=""
            > 
          </a>
        </nav>
        <button
          v-scroll-to="'.header'"
          class="top__back-to-page-top back-to-page-top"
        >
          <img
            class="back-to-page-top__icon"
            src="~/assets/img/revamp/top_arrow.svg"
            alt=""
          >
        </button>
      </div>
    </div>
    <div class="footer__bottom bottom">
      <div class="bottom__wrapper">
        <div class="bottom__main-navs main-navs">
          <nav class="main-navs__voice-navs voice-navs">
            <nuxt-link
              class="voice-navs__nav"
              :to="internalLinks.privacy"
            >
              隱私政策
            </nuxt-link>
            <nuxt-link
              class="voice-navs__nav"
              :to="internalLinks.about"
            >
              關於我們
            </nuxt-link>
            <nuxt-link
              class="voice-navs__nav"
              :to="internalLinks.contact"
            >
              聯絡我們
            </nuxt-link>
          </nav>
          <nav class="main-navs__sns-navs sns-navs">
            <a
              class="sns-navs__link"
              :href="externalLinks.mirrorvoiceFB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="fb-icon"
                src="~/assets/img/revamp/facebook.svg"
                alt=""
              >
            </a>
            <a
              class="sns-navs__link"
              :href="externalLinks.mirrorvoiceIG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="ig-icon"
                src="~/assets/img/revamp/instagram.svg"
                alt=""
              >
            </a>
          </nav>
        </div>
        <div class="bottom__aside-navs aside-navs">
          <nav class="aside-navs__desktop-external-link-navs desktop-external-link-navs">
            <a
              class="desktop-external-link-navs__nav"
              :href="externalLinks.mirrormedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="desktop-mm-logo"
                src="~/assets/img/revamp/mirrorvoice_media@2x.png"
                alt=""
              >
            </a>
            <a
              class="desktop-external-link-navs__nav"
              :href="externalLinks.mirrorfiction"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="desktop-mf-logo"
                src="~/assets/img/revamp/mirrorfiction_logo@2x.png"
                alt=""
              > 
            </a>
          </nav>
          <p class="aside-navs__copyright-hint copyright-hint">
            <span
              class="copyright-hint__company"
              v-text="copyrightHint.company"
            />
            <span
              class="copyright-hint__content"
              v-text="copyrightHint.content"
            />
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      copyrightHint: {
        company: 'Copyright © 鏡文學股份有限公司',
        content: 'All Rights Reserved.'
      },
      externalLinks: {
        mirrormedia: 'https://www.mirrormedia.mg',
        mirrorfiction: 'https://mirrorfiction.com',
        mirrorvoiceFB: 'https://www.facebook.com/mirrormediaculture',
        mirrorvoiceIG: 'https://www.instagram.com/mirror_voice'
      },
      internalLinks: {
        privacy: '/privacy_rule',
        about: '/about',
        contact: '/contact'
      }
    }
  },
  computed: {
    ...mapState({
      showAppPlayer: state => state.appPlayer.showAppPlayer
    })
  },
  methods: {
    handlePrivacyRuleClick() {
      this.$sendGAFooter({ action: 'click', label: 'privacy_rule' })
    },
    handleAboutClick() {
      this.$sendGAFooter({ action: 'click', label: 'about' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer
  display flex
  flex-direction column
  &--higher
    padding 0 0 60px 0

.top
  background-color transparent
  height 40px
  display flex
  align-items center
  z-index 1000
  &__wrapper
    width 100%
    max-width 1280px
    margin 0 auto
    display flex
    justify-content flex-end
  &__mobile-external-link-navs
    display none

.back-to-page-top
  background-color transparent
  border none
  cursor pointer
  outline none
  padding 0
  &__icon
    width 20px
    height 20px
    filter: invert(92%) sepia(2%) saturate(16%) hue-rotate(316deg) brightness(92%) contrast(96%);

.bottom
  background-color #FF6D2D
  display flex
  align-items center
  height 60px
  z-index 1000
  &__wrapper
    width 100%
    max-width 1280px
    margin 0 auto
    display flex
    justify-content space-between
    align-items center

.main-navs
  display flex
  &__sns-navs
    margin 2px 0 0 13px
.voice-navs
  display flex
  align-items center
  &__nav
    color white
    font-size 14px
    display flex
    align-items center
    height 21px
    & + &
      margin 0 0 0 16px
      padding 0 0 0 16px
      border-left 1px solid white
.sns-navs
  display flex
  align-items center
  &__link
    & + &
      margin 0 0 0 26px
.fb-icon
  width 16px
  height 20px
  // background-color black
  filter: invert(92%) sepia(90%) saturate(3%) hue-rotate(201deg) brightness(111%) contrast(100%);
.ig-icon
  width 20px
  height 20px
  filter: invert(92%) sepia(90%) saturate(3%) hue-rotate(201deg) brightness(111%) contrast(100%);

.aside-navs
  display flex
  align-items center
  &__copyright-hint
    margin 0 0 0 26px
.desktop-external-link-navs
  &__nav
    & + &
      margin 0 0 0 20px
.desktop-mm-logo
  height 20px
.desktop-mf-logo
  height 20px

.copyright-hint
  color white
  font-size 13px

@media (max-width 768px)
  .top
    background-color white
    height 70px
    display flex
    align-items center
    &__wrapper
      width 100%
      max-width auto
      margin 0
      padding 0 25px
      display flex
      justify-content center
      position relative
    &__mobile-external-link-navs
      display flex
    &__back-to-page-top
      position absolute
      right 25px
      top calc(100% / 2 - 10px)

  .mobile-external-link-navs
    display flex
    align-items center
    &__nav
      & + &
        margin 0 0 0 20px
  .mobile-mm-logo
    height 32px
  .mobile-mf-logo
    height 24px

  .bottom
    height auto
    padding 22px 0 10px 0
    &__wrapper
      width 100%
      max-width auto
      margin 0
      display flex
      flex-direction column
      justify-content flex-start
      align-items center

  .sns-navs
    &__link
      & + &
        margin 0 0 0 20px

  .aside-navs
    &__copyright-hint
      margin 13px 0 0 0
  .desktop-external-link-navs
    display none

  .copyright-hint
    display flex
    flex-direction column
    align-items center
    &__company
      font-weight bold
    &__content
      margin 5px 0 0 0
</style>
