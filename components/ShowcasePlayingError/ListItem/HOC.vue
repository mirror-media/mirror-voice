<template>
  <li class="hoc">
    <slot
      :coverImgUrl="coverImgUrl"
      :to="to"
      :title="title"
      :vocal="vocal"
    />
  </li>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      limitTitle: 20
    }
  },
  computed: {
    coverImgUrl() {
      return _.get(this.data, 'cover', '')
    },
    to() {
      return `/single/${_.get(this.data, 'slug', '')}`
    },
    title() {
      return _.truncate(_.get(this.data, 'title', ''), {
        length: this.limitTitle
      })
    },
    vocal() {
      return _.get(_.take(_.get(this.data, 'vocals', [])), 'name', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
