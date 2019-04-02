<template>
  <div class="switchers">
    <button class="switchers__switcher switcher">
      <img
        class="switcher__img"
        src="~/assets/img/arrow_left_default.png"
        alt=""
        @click="$emit('clickLeft')"
      >
    </button>
    <button class="switchers__switcher switcher">
      <img
        class="switcher__img"
        src="~/assets/img/arrow_right_default.png"
        alt=""
        @click="$emit('clickRight')"
      >
    </button>
  </div>
</template>

<style lang="stylus" scoped>
.switcher
  background-color transparent
  border none
  cursor pointer
  width 30px
  height 30px
  padding 0
  &:focus
    outline none
  & + &
    margin 0 0 0 8px
  &__img
    width 100%
    height 100%
    transition filter .15s ease-out
    &:hover
      filter brightness(90%)

@media (max-width 768px)
  .switcher
    &__img
      &:hover
        filter none
</style>
