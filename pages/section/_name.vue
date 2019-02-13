<template>
  <section class="section">
    <AppDiv class="section__wrapper top-wrapper">
      <PageNavsHorizontal/>
    </AppDiv>
    <AppDiv class="section__wrapper bottom-wrapper">
      <DivHeader
        :title="'全部類別一'"
        :subTitle="'共 180 筆'"
      />
      <ShowcaseList
        class="bottom-wrapper__showcase"
        :listItemLayout="'horizontal'"
      />
    </AppDiv>
  </section>
</template>

<script>
import AppDiv from '~/components/AppDiv.vue'
import PageNavsHorizontal from '~/components/PageNavs/PageNavsHorizontal.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'

export default {
  components: {
    AppDiv,
    PageNavsHorizontal,
    DivHeader,
    ShowcaseList
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
</style>
