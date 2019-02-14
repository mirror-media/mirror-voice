<template>
  <div class="breadcrumb">
    <nuxt-link to="/">首頁</nuxt-link>
    <nuxt-link to="/section/fakeslug">有聲書</nuxt-link>
    <nuxt-link to="/album/fakename">高難度對話</nuxt-link>
    <nuxt-link to="/album/fakeslug">有效的家庭關係</nuxt-link>
  </div>
</template>

<style lang="stylus" scoped>
.breadcrumb
  a
    font-size 14px
    color #7d7d7d
    &:not(:last-child):after
      content ' /'
</style>
