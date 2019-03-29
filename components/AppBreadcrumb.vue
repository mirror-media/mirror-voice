<template>
  <div class="breadcrumb">
    <nuxt-link
      v-for="(crumb, i) in crumbs"
      :key="i"
      :to="getPath(crumb)"
    >
      {{ getTitle(crumb) }}
    </nuxt-link>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      crumbs: state => state.appBreadcrumb.crumbs
    })
  },
  methods: {
    getPath(crumb) {
      return _.get(crumb, 'path', '/')
    },
    getTitle(crumb) {
      return _.get(crumb, 'title', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.breadcrumb
  a
    font-size 14px
    color #7d7d7d
    &:not(:last-child):after
      content ' /'
</style>
