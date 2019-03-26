<template>
  <div class="tag">
    {{ name }}
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    tag: {
      type: Object,
      default() {
        return {}
      },
      validator(value) {
        return !!value.name
      }
    }
  },
  computed: {
    name() {
      return _.get(this.tag, 'name', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag
  padding 7px 11px
  background-color #eeeeee
  font-size 14px
  color #7d7d7d

@media (max-width 768px)
  .tag
    font-size 11px
</style>
