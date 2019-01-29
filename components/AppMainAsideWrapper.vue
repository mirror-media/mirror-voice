<template>
  <section class="wrapper">
    <main class="wrapper__main">
      <slot name="main"></slot>
    </main>
    <aside class="wrapper__aside">
      <slot name="aside"></slot>
    </aside>
  </section>
</template>

<style lang="stylus" scoped>
.wrapper
  max-width 999px
  // width 999px
  // height 1000px
  // border 1px solid red
  margin 0 auto
  display flex
  &__main
    width 723px
    // border 1px solid blue
  &__aside
    width 256px
    margin 0 0 0 20px
    // border 1px solid blue
</style>
