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
        @mouseover.native="handleMouseover"
        @mouseout.native="handleMouseout"
        v-text="title"
      />
    </div>
    <div class="wrapper__audio-info audio-info">
      <BaseAudioDuration
        v-if="showDuration"
        :audio="audio"
        class="audio-info__duration"
      />
      <button
        :class="[
          'audio-info__playbutton',
          'playbutton',
          { 'playbutton--border': isMouseover }
        ]"
        @click="playSingle"
        @mouseover="handleMouseover"
        @mouseout="handleMouseout"
      >
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
import { mapActions, mapMutations } from 'vuex'
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
      titleHeightBase: 27,
      isMouseover: false
    }
  },
  computed: {
    titleHeight() {
      return this.titleHeightBase * this.titleLineClamp
    },
    single() {
      return {
        title: this.title,
        slug: this.to.replace('/single/', ''),
        audio: {
          audio: {
            url: this.audio
          }
        }
      }
    }
  },
  methods: {
    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      SET_ALBUM_COVER: 'appPlayer/SET_ALBUM_COVER',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES'
    }),
    playSingle() {
      this.SET_ALBUM_ID('')
      this.SET_ALBUM_COVER('')
      this.CLEAR_PAGES()
      this.PREPARE_SINGLES({ page: 1, res: { items: [this.single] } }).then(
        () => {
          this.SET_PLAYING_INDEX(0)
        }
      )
    },
    handleMouseover() {
      this.isMouseover = true
      this.$emit('mouseover')
    },
    handleMouseout() {
      this.isMouseover = false
      this.$emit('mouseout')
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
  width 26px
  height 26px
  padding 3px
  background-color transparent
  outline none
  cursor pointer
  border-radius 100%
  display flex
  justify-content center
  align-items center
  border 1px solid transparent
  transition border .25s ease-out
  &--border
    border 1px solid #FF6D2D
  &__img
    width 100%
    height 100%
    filter: invert(48%) sepia(79%) saturate(1572%) hue-rotate(341deg) brightness(101%) contrast(101%);

@media (max-width 768px)
  .title-wrapper
    &__title
      font-size 14px
</style>
