<template>
  <HOC
    v-slot="{
      coverImgUrl,
      to,
      title,
      vocal
    }"
    :data="data"
  >
    <Presentational
      :cover-img-url="coverImgUrl"
      :to="to"
      :title="title"
      :vocal="vocal"
    />
  </HOC>
</template>

<script>
import HOC from './HOC.vue'
import Presentational from './Presentational.vue'

export default {
  components: {
    HOC,
    Presentational
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
