<template>
  <div class="pagination-wrapper">
    <no-ssr>
      <VueAdsPagination
        :total-items="total"
        :page="internalPage"
        :items-per-page="itemsPerPage"
      >
        <!-- https://github.com/arnedesmedt/vue-ads-pagination/issues/11 -->
        <template><div /></template>

        <template
          slot="buttons"
          slot-scope="props"
        >
          <VueAdsPageButton
            v-for="(button, key) in props.buttons"
            :key="key"
            :class="[
              'button',
              { 'button--active': button.active },
              { 'button--no-border': button.page === '...' }
            ]"
            v-bind="button"
            @page-change="internalPage = button.page"
            @range-change="start = button.start; end = button.end"
            v-text="getText(button, key, props.buttons.length)"
          />
        </template>
      </VueAdsPagination>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination'

export default {
  components: {
    'no-ssr': NoSSR,
    VueAdsPagination,
    VueAdsPageButton
  },
  props: {
    total: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      internalPage: this.page <= 0 ? 0 : this.page - 1,
      start: 0,
      end: 0
    }
  },
  watch: {
    page() {
      this.internalPage = this.page <= 0 ? 0 : this.page - 1
    },
    internalPage() {
      this.$emit('pageChange', this.internalPage + 1)
      this.$emit('update:page', this.internalPage + 1)
    }
  },
  methods: {
    getText(button, index, totalPages) {
      switch (index) {
        case 0:
          return '<'
        case totalPages - 1:
          return '>'
        default:
          return Number.isInteger(button.page) ? button.page + 1 : button.page
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper
  display flex
  justify-content center

.button
  width 32px
  height 38px
  border-radius 1px
  background-color #ffffff
  font-size 16px
  color #7d7d7d
  outline none
  cursor pointer
  text-align center
  padding 0
  box-shadow:
    2px 0 0 0 #eeeeee, 
    0 2px 0 0 #eeeeee, 
    2px 2px 0 0 #eeeeee,   /* Just to fix the corner */
    2px 0 0 0 #eeeeee inset, 
    0 2px 0 0 #eeeeee inset
  border none
  &--active
    background-color #eeeeee
  &--no-border
    box-shadow: 
      0px 0 0 0 white, 
      0 0px 0 0 white, 
      0px 0px 0 0 white,   /* Just to fix the corner */
      2px 0 0 0 #eeeeee inset, 
      0 0px 0 0 white inset
</style>
