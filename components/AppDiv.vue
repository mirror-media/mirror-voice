<template>
  <div
    class="div"
    :style="{ padding: padding }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: '25px'
    }
  }
}
</script>


<style lang="stylus" scoped>
.div
  background-color white
</style>
