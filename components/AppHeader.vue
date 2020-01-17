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
        <nav class="main-navs__section-navs section-navs">
          <HeaderNav
            v-for="category in categories"
            :key="category.id"
            :text="category.title"
            :to="`/category/${category.name}`"
            class="section-navs__nav"
          />
        </nav>
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
import { mapState } from 'vuex'
import HeaderNav from '~/components/Header/HeaderNav.vue'

export default {
  components: {
    HeaderNav
  },
  computed: {
    ...mapState(['categories'])
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
  &__section-navs
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
    &__section-navs
      display none
</style>
