<template>
  <header class="header">
    <nuxt-link to="/">
      <img class="header__logo" src="~/assets/img/logo.svg" alt="">
    </nuxt-link>
  </header>
</template>

<style lang="stylus" scoped>
.header
  height 70px
  background-color #d84939
  padding 0 0 0 20px
  display flex
  align-items center
  &__logo
    width 100px

@media (max-width 768px)
  .header
    height 72px
    padding 0 0 0 14px
</style>
