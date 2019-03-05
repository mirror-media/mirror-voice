<template>
  <div class="breadcrumb">
    <nuxt-link
      v-for="(crumb, i) in crumbs"
      :key="i"
      :to="crumb.path"
    >
      {{ crumb.title }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      crumbs: state => state.appBreadcrumb.crumbs
    })
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
