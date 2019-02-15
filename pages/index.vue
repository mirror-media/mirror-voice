<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <Slider />
      <AppDiv class="main__wrapper showcase">
        <DivHeader
          class="showcase__header header"
          :size="'large'"
          :weight="'bold'"
          :align-items="'flex-end'"
        >
          <nuxt-link
            slot="left"
            class="header__left"
            to="/section/section1"
          >
            類別一
          </nuxt-link>
          <nuxt-link
            slot="right"
            class="header__right"
            to="/section/section1"
          >
            更多
          </nuxt-link>
        </DivHeader>
        <ShowcaseList class="showcase__showcase" />
      </AppDiv>
      <AppDiv class="main__wrapper showcase">
        <DivHeader
          class="showcase__header header"
          :size="'large'"
          :weight="'bold'"
          :align-items="'flex-end'"
        >
          <nuxt-link
            slot="left"
            class="header__left"
            to="/section/section2"
          >
            類別二
          </nuxt-link>
          <nuxt-link
            slot="right"
            class="header__right"
            to="/section/section2"
          >
            更多
          </nuxt-link>
        </DivHeader>
        <ShowcaseList class="showcase__showcase" />
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

.header
  &__right
    font-size 14px
    color #7d7d7d
    cursor pointer
</style>
