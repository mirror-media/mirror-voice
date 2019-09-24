<template>
  <header class="header">
    <nav class="header__main-navs main-navs">
      <nuxt-link to="/">
        <img
          class="header__mv-logo"
          src="~/assets/img/revamp/mirrorvoice_logo@2x.png"
          alt=""
        >
      </nuxt-link>
      <nav class="main-navs__section-navs section-navs">
        <HeaderSectionNav
          v-for="section in sections"
          :key="section.id"
          :section="section"
          class="section-navs__nav"
        />
      </nav>
    </nav>
    <nav class="header__aside-navs aside-navs">
      <a
        href="https://www.mirrormedia.mg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="header__mm-logo"
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
          class="header__mf-logo"
          src="~/assets/img/revamp/mirrorfiction_logo@2x.png"
          alt=""
        >      
      </a>
    </nav>
  </header>
</template>

<script>
import HeaderSectionNav from '~/components/Header/HeaderSectionNav.vue'

import { mapState } from 'vuex'

export default {
  components: {
    HeaderSectionNav
  },
  computed: {
    ...mapState(['sections'])
  }
}
</script>

<style lang="stylus" scoped>
.header
  z-index 1000
  height 60px
  background-color white
  box-shadow 0px 3px 6px #00000029
  padding 0 80px
  display flex
  justify-content space-between
  align-items center
  &__mv-logo
    height 32px
  &__mm-logo, &__mf-logo
    height 20px

.main-navs
  display flex
  align-items center
  &__section-navs
    margin 0 0 0 21px

.section-navs
  display flex
  align-items center

.aside-navs
  a + a
    margin 0 0 0 12px

@media (max-width 768px)
  .header
    height 50px
    padding 0 10px

  .main-navs
    width 100%
    justify-content space-between
    &__section-navs
      margin 0 0 0 12px

  .aside-navs
    display none

@media (max-width 320px)
  .main-navs
    &__section-navs
      margin 0
</style>
