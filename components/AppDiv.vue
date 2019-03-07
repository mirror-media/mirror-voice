<template>
  <div class="div">
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
.div
  padding 25px
  background-color white

@media (max-width 768px)
  .div
    padding 18px
</style>
