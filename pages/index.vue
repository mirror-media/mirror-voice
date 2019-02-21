<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <Slider
        :items="sliderItems"
      />
      <AppDiv
        v-for="(section, i) in sections"
        :key="i"
        class="main__wrapper showcase"
      >
        <DivHeader
          class="showcase__header header"
          :size="'large'"
          :weight="'bold'"
          :align-items="'flex-end'"
        >
          <nuxt-link
            slot="left"
            class="header__left"
            :to="`/section/${section.name}`"
          >
            {{ section.title }}
          </nuxt-link>
          <nuxt-link
            slot="right"
            class="header__right"
            :to="`/section/${section.name}`"
          >
            更多
          </nuxt-link>
        </DivHeader>
        <ShowcaseList class="showcase__showcase" />
      </AppDiv>
    </div>
    <PageNavsVertical
      slot="aside"
      :sections="sections"
    />
  </AppMainAsideWrapper>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapState({
      sliderItems: state => state.audioPromotions.items
    }),
    ...mapGetters({
      sections: 'sections/AUDIO_SECTIONS'
    })
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('audioPromotions/FETCH'),
      store.dispatch('sections/FETCH')
    ])
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
