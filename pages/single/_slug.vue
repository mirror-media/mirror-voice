<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv class="main__wrapper info-wrapper">
        <Info/>
      </AppDiv>
      <AppDiv class="main__wrapper body-wrapper">
        <AppH1 class="body-wrapper__title">文稿</AppH1>
        <div class="body-wrapper__body" v-html="body"></div>
      </AppDiv>
    </div>
    <div slot="aside" class="aside">
      <AppDiv class="aside__wrapper album-wrapper">
        <AppH1 class="album-wrapper__title">收錄於</AppH1>
        <div class="album-wrapper__album album">
          <figure class="album__info">
            <img src="" alt="">
            <figcaption>高難度對話：如何與挑剔的人愉快相處</figcaption>
          </figure>
          <div class="album__description">
            <p>你如果明白什麼事物能激起別人的反應，就能優化自己的行為、互動與人際關係。在沒有架構的情況下試圖和別人愉快相處，有點像是在沒有公式的情況下試圖解答複雜的數學題。這兩種做法不僅都相當困難，也會帶來許多不必要的痛苦。本書會給你學校從來沒教的人際技能。</p>
          </div>
        </div>
      </AppDiv>
      <AppDiv
        class="aside__wrapper album-relateds-wrapper"
        :padding="'25px 8px 7px 8px'"
      >
        <DivHeader
          class="album-relateds-wrapper__header"
          :title="'同專輯的其他音檔'"
        />
        <TrackList
          class="album-relateds-wrapper__track-list"
        />
      </AppDiv>
    </div>
  </AppMainAsideWrapper>
</template>

<script>
import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import AppH1 from '~/components/AppH1.vue'
import TrackList from '~/components/Track/TrackList.vue'
import Info from '~/components/Info/Info.vue'

export default {
  layout: 'showBreadcrumb',
  components: {
    AppMainAsideWrapper,
    AppDiv,
    DivHeader,
    AppH1,
    TrackList,
    Info
  },
  data() {
    return {
      body: `
        <p>人足個舉；在我邊家；了確電又！家年有代校，士可超好古的什火球子級修！</p>
        <p>我急家題：向會的數而媽件陸外企服變政資山美裡：油但更有之義農原於而青候館這防畫頭修到軍的作走會行他走他營家維會財水……指用辦統教期關國古岸，亞無度木看化這金手？</p>
        <p>的龍來爸，古大運的要的中錢女必經地先之盡重院動，在最是近善居視多港但高老化龍共無無市的學那子行子處華決一集什為數話一：心動時傳至印飛兩大上海車大、便呢臺斯。知際去而公總。馬許看財觀如導問教得他的示工：到大布印中有勢書票回道人區自平死手施難始人開所道環再那養樂人舉，天發族；科文商院他意民整小演、山雄產約調費際的長字此指難不老算……水五心話要，出生黃回用時生奇到王們風日經，市水部形品是一的百師積平分史經，有女引，我劇說果、國就都文亞這親，心我靜經日自簡不要，大依下分論表神發，球然了遠語不謝天雖些才眼合何、升則展官二差行！作新引成加要定賣在子人斷使羅念日光少學大……以少三紀覺是為平都建成也原可！地分所皮，好半藝、小們本條一油成教時交來民都品！全結位日政家變學臺們我景了了是告調；日支用：房國路、見深是月大在傳甚其興人定學活前才邊，其她突事全。</p>
        <p>願現結改主有印成接後出心吃外我以與看題作小外的動的行是老標如語過遊十主影回推反，病靈一要運有……地同千的而的生然需上；然信究遊回開……親話喜最她得另天於養關成太水價話後手！</p>
      `
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  &__wrapper
    & + &
      margin 20px 0 0 0

.aside
  &__wrapper
    & + &
      margin 20px 0 0 0

// .info-wrapper
//   &__title
//     font-weight 600 !important

.body-wrapper
  // &__title
  //   font-size 18px !important
  &__body
    margin 17px 0 0 0
    color #7d7d7d
    font-size 14px
    line-height 1.71
    text-align justify
    & >>> *
      margin 20px 0 0 0

.album-wrapper
  &__title
    font-size 18px !important
  &__album
    margin 21px 0 0 0

.album-relateds-wrapper
  &__header
    margin 0 17px
  &__track-list
    margin 20px 0 0 0

.album
  &__info
    display flex
    img
      display block
      d = 70px
      min-width d
      width d
      min-height d
      height d
      background-color black
    figcaption
      font-size 16px
      line-height 1.25
      text-align justify
      margin 0 0 0 17px
  &__description
    margin 18px 0 0 0
    p
      font-size 14px
      line-height 1.71
      text-align justify
      color #7d7d7d
</style>
