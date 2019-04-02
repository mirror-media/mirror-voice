<template>
  <HOC
    :data="data"
  >
    <Presentational
      slot-scope="{
        fig,
        figcaption,
        description
      }"
      :title="title"
      :img-style="imgStyle"
      :fig="fig"
      :figcaption="figcaption"
      :description="description"
      @clickFigure="$emit('clickFigure')"
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
    },
    title: {
      type: String,
      required: true
    },
    imgStyle: {
      type: String,
      default: 'square',
      validator(value) {
        return ['square', 'round'].includes(value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
