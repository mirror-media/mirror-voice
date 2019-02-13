<template>
  <AppMainAsideWrapper>
    <div slot="main" class="main">
      <AppDiv class="main__wrapper info-wrapper">
        <Info :layout="'album'"/>
      </AppDiv>
      <AppDiv class="main__wrapper body-wrapper">
        <AppH1 class="body-wrapper__title">簡介</AppH1>
        <div class="body-wrapper__body" v-html="body"></div>
      </AppDiv>
      <AppDiv class="main__wrapper tracks-wrapper">
        <DivHeader
          class="tracks-wrapper__header"
          :title="'專輯音檔（18）'"
        >
          <div class="sorts">
            <button class="sorts__sort">最新</button>
            <button class="sorts__sort">最舊</button>
          </div>
        </DivHeader>
        <TrackList
          class="tracks-wrapper__tracks"
          :showListOrder="true"
        />
      </AppDiv>
    </div>
    <div slot="aside" class="aside">
      <AsideIntro
        class="aside__wrapper anchor"
        :title="'主播'"
        :imgStyle="'round'"
      />
      <AsideAlbumList
        class="aside__wrapper anchor-relateds"
      />
    </div>
  </AppMainAsideWrapper>
</template>

<script>
import AppMainAsideWrapper from '~/components/AppMainAsideWrapper.vue'
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'
import Info from '~/components/Info/Info.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import AsideIntro from '~/components/Aside/AsideIntro.vue'
import AsideAlbumList from '~/components/Aside/AsideAlbumList.vue'
import TrackList from '~/components/Track/TrackList.vue'

export default {
  components: {
    AppMainAsideWrapper,
    AppDiv,
    AppH1,
    Info,
    DivHeader,
    AsideIntro,
    AsideAlbumList,
    TrackList
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

.body-wrapper
  &__body
    margin 17px 0 0 0
    color #7d7d7d
    font-size 14px
    line-height 1.71
    text-align justify
    & >>> *
      margin 20px 0 0 0

.sorts
  &__sort
    border none
    background-color transparent
    padding 0 14px
    line-height 1
    font-size 14px
    color #7d7d7d
    cursor pointer
    &:focus
      outline none
    &:first-child
      padding 0 14px 0 0
    &:last-child
      padding 0 0 0 14px
    & + &
      border-left 2px solid #7d7d7d

.tracks-wrapper
  &__tracks
    margin 18px 0 0 0
</style>
