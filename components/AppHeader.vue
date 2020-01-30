<template>
  <header class="header">
    <div class="header__wrapper">
      <nav class="header__main-navs main-navs">
        <nuxt-link
          to="/"
          @click.native="handleLogoClick"
        >
          <img
            class="header__mv-logo"
            src="~/assets/img/revamp/mirrorvoice_logo@2x.png"
            alt=""
          >
        </nuxt-link>
        <AppCategoriesNav
          class="main-navs__categories-navs"
        />
      </nav>
      <!-- <nav class="header__aside-navs aside-navs">
        <nuxt-link
          class="aside-navs__nav"
          to="/history"
        >
          <img
            class="header__history-icon"
            src="~/assets/img/revamp/history.svg"
            alt=""
          >
        </nuxt-link>
      </nav> -->
    </div>
  </header>
</template>

<script>
import AppCategoriesNav from '~/components/AppCategoriesNav.vue'

export default {
  components: {
    AppCategoriesNav
  },
  methods: {
    handleLogoClick() {
      this.$sendGAHeader({ action: 'click', label: 'logo' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position relative
  z-index 1000
  height 60px
  background-color white
  box-shadow 0px 3px 6px #00000029
  display flex
  align-items center
  &__wrapper
    display flex
    justify-content space-between
    align-items center
    width 1280px
    margin 0 auto
  &__mv-logo
    height 32px
  &__history-icon
    height 23px

.main-navs
  display flex
  align-items center
  &__categories-navs
    margin 0 0 0 50px

.section-navs
  display flex
  align-items center
  position relative
  top 3px
  &__nav
    & + &
      margin 0 0 0 60px

@media (max-width 768px)
  .header
    height 50px
    padding 0 20px 0 10px
    &__wrapper
      width 100%

  .main-navs
    width 100%
    &__categories-navs
      display none
</style>
