<template>
  <button class="button">
    送出
  </button>
</template>

<style lang="stylus" scoped>
.button
  width 140px
  height 40px
  background-color #273947
  color white
  font-size 16px
  display flex
  justify-content center
  align-items center
  border none
  border-radius 4px
  cursor pointer
  transition filter .25s ease-out
  &:hover
    filter brightness(.8)
</style>
