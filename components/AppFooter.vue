<template>
  <footer class="footer">
    <nav class="footer__navs navs">
      <div class="navs__nav">聯絡我們</div>
      <nuxt-link to="/tos" class="navs__nav">服務條款</nuxt-link>
      <div class="navs__nav">隱私政策</div>
    </nav>
    <div class="footer__rights">
      <p>Copyright © 2019 精鏡傳媒股份有限公司 All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style lang="stylus" scoped>
.footer
  height 150px
  background-color white
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__rights
    margin 28px 0 0 0
    font-size 14px
    color #7d7d7d

.navs
  display flex
  &__nav
    font-size 18px
    color black
    cursor pointer
    & + &
      margin 0 0 0 53px
</style>
