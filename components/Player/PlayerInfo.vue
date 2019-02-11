<template>
  <div class="info">
    <template v-if="showTitle">
      <p class="info__first">高難度對話：如何與挑剔的人愉快相處</p>
      <p class="info__second"><span>00:02:44</span> / 00:48:29</p>
    </template>
    <template v-else>
      <p class="info__first">00:34:51</p>
      <p class="info__second">00:48:29</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    showTitle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  display flex
  justify-content space-between
  font-size 12px
  &__first
    line-height 1
    color #e5e5e5
  &__second
    line-height 1
    color #7d7d7d
    span
      color #e5e5e5
</style>
