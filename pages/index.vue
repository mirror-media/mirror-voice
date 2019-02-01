<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <Slider/>
      <AppDiv class="main__wrapper showcase">
        <DivHeader
          class="showcase__header"
          :title="'類別一'"
          :size="'large'"
          :weight="'bold'"
          :alignItems="'flex-end'"
        >
          <nuxt-link
            class="more"
            to="/section/section1"
          >
            更多
          </nuxt-link>
        </DivHeader>
        <ShowcaseList class="showcase__showcase"/>
      </AppDiv>
      <AppDiv class="main__wrapper showcase">
        <DivHeader
          class="showcase__header"
          :title="'類別二'"
          :size="'large'"
          :weight="'bold'"
          :alignItems="'flex-end'"
        >
          <nuxt-link
            class="more"
            to="/section/section2"
          >
            更多
          </nuxt-link>
        </DivHeader>
        <ShowcaseList class="showcase__showcase"/>
      </AppDiv>
    </div>
    <PageNavsVertical
      slot="aside"
    />
  </AppMainAsideWrapper>
</template>

<script>
import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import Slider from '~/components/Slider/Slider.vue'
import ShowcaseList from '~/components/Showcase/ShowcaseList.vue'
import PageNavsVertical from '~/components/PageNavs/PageNavsVertical.vue'

export default {
  components: {
    AppMainAsideWrapper,
    AppDiv,
    DivHeader,
    Slider,
    ShowcaseList,
    PageNavsVertical
  }
}
</script>

<style lang="stylus" scoped>
.main
  &__wrapper
    margin 20px 0 0 0

.showcase
  &__showcase
    margin 24px 0 0 0

.more
  font-size 14px
  color #7d7d7d
  cursor pointer
</style>
