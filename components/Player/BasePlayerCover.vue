<template>
  <nuxt-link
    class="cover"
    :to="to"
  >
    <img
      v-show="showImg"
      class="cover__img"
      :src="imgSrc"
      alt=""
    >
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  computed: {
    showImg() {
      return this.imgSrc && this.imgSrc !== ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.cover
  display inline-block
  d = 34px
  width d
  height d
  &__img
    width 100%
    height 100%
    object-fit cover
</style>
