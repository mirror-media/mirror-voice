<template>
  <div class="wrapper">
    <div
      class="wrapper__title-wrapper title-wrapper"
      :style="{
        height: `${titleHeight}px`
      }"
    >
      <nuxt-link
        :to="to"
        class="title-wrapper__title"
        :style="{
          '-webkit-line-clamp': titleLineClamp,
        }"
        v-text="title"
      />
    </div>
    <div class="wrapper__audio-info audio-info">
      <BaseAudioDuration
        v-if="showDuration"
        :audio="audio"
        class="audio-info__duration"
      />
      <button class="audio-info__playbutton playbutton">
        <img
          class="playbutton__img"
          src="~/assets/img/revamp/headphones.svg"
          alt=""
        >
      </button>
    </div>
  </div>
</template>

<script>
import BaseAudioDuration from './BaseAudioDuration.vue'

export default {
  components: {
    BaseAudioDuration
  },
  props: {
    title: {
      type: String,
      required: true
    },
    titleLineClamp: {
      type: Number,
      default: 1
    },
    audio: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    showDuration: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleHeightBase: 27
    }
  },
  computed: {
    titleHeight() {
      return this.titleHeightBase * this.titleLineClamp
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  display inline-flex
  width 100%
  justify-content space-between
  &__audio-info
    margin 0 0 0 30px

.title-wrapper
  flex 1 1 auto
  width 0
  display flex
  align-items center
  &__title
    color black
    font-size 15px
    text-align justify
    line-height 1.8
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

.audio-info
  display flex
  align-items center
  &__duration
    font-size 12px
    color #B8B8B8
  &__playbutton
    margin 0 0 0 15px

.playbutton
  width 20.38px
  height 18px
  background-color transparent
  border none
  outline none
  padding 0
  cursor pointer
  &__img
    width 100%
    height 100%
    filter: invert(48%) sepia(79%) saturate(1572%) hue-rotate(341deg) brightness(101%) contrast(101%);

@media (max-width 768px)
  .title-wrapper
    &__title
      font-size 14px
</style>
