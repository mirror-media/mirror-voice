<template>
  <section class="wrapper">
    <main class="wrapper__main">
      <slot name="main" />
    </main>
    <aside class="wrapper__aside">
      <slot name="aside" />
    </aside>
  </section>
</template>

<style lang="stylus" scoped>
.wrapper
  max-width 1000px
  margin 0 auto
  display flex
  &__main
    width 723px
  &__aside
    width 256px
    margin 0 0 0 20px

@media (max-width 768px)
  .wrapper
    max-width 100%
    margin 0
    display flex
    flex-direction column
    &__main
      width 100%
    &__aside
      width 100%
      margin 0
</style>
