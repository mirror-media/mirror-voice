<template>
  <div class="tag">
    {{ '自我提升'.slice(0, Math.floor(Math.random() * 5)) }}
  </div>
</template>

<style lang="stylus" scoped>
.tag
  padding 7px 11px
  background-color #eeeeee
  font-size 14px
  color #7d7d7d
</style>
