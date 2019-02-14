<template>
  <section class="section">
    <AppDiv class="section__wrapper top-wrapper">
      <PageNavsHorizontal />
    </AppDiv>
    <AppDiv class="section__wrapper bottom-wrapper">
      <DivHeader
        :title="'全部類別一'"
        :sub-title="'共 180 筆'"
      />
      <ShowcaseList
        class="bottom-wrapper__showcase"
        :list-item-layout="'horizontal'"
      />
      <AppPagination
        class="bottom-wrapper__pagination"
      />
    </AppDiv>
  </section>
</template>

<script>
import AppDiv from '~/components/AppDiv.vue'
import PageNavsHorizontal from '~/components/PageNavs/PageNavsHorizontal.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'
import AppPagination from '~/components/AppPagination.vue'

export default {
  components: {
    AppDiv,
    PageNavsHorizontal,
    DivHeader,
    ShowcaseList,
    AppPagination
  }
}
</script>

<style lang="stylus" scoped>
.section
  max-width 1000px
  margin 0 auto
  &__wrapper
    & + &
      margin 18px 0 0 0

.bottom-wrapper
  &__showcase
    margin 26px 0 0 0
  &__pagination
    margin 75px 0 0 0
</style>
