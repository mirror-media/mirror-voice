<template>
  <nav class="navs">
    <button
      class="button rewind-button"
      @click="handleClickRewind"
    >
      <img
        class="rewind-button__img"
        src="~/assets/img/skip15secback.svg"
        alt="rewind"
      >
    </button>
    <button
      v-show="showTracksNav"
      class="button backward-button"
      @click="handleClickBackward"
    >
      <img
        class="backward-button__img"
        src="~/assets/img/btn_forward_normal.png"
        alt="backward"
      >
    </button>
    <button
      :class="[
        'button',
        'main-button',
        { 'play': isPlaying },
        { 'pause': !isPlaying }
      ]"
      @click="handleClickMain"
    >
      <img
        v-show="!isPlaying"
        class="main-button__img"
        src="~/assets/img/btn_play.png"
        alt="play"
      >
      <img
        v-show="isPlaying"
        class="main-button__img"
        src="~/assets/img/btn_pause.png"
        alt="pause"
      >
    </button>
    <button
      v-show="showTracksNav"
      class="button forward-button"
      @click="handleClickForward"
    >
      <img
        class="forward-button__img"
        src="~/assets/img/btn_backward_normal.png"
        alt="forward"
      >
    </button>
    <button
      class="button fastforward-button"
      @click="handleClickFastforward"
    >
      <img
        class="fastforward-button__img"
        src="~/assets/img/skip15sec.svg"
        alt="fastforward"
      >
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    showTracksNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickRewind() {
      this.$emit('rewind')
    },
    handleClickFastforward() {
      this.$emit('fastforward')
    },
    handleClickBackward() {
      this.$emit('backward')
    },
    handleClickForward() {
      this.$emit('forward')
    },
    handleClickMain() {
      this.$emit('update:isPlaying', !this.isPlaying)
    }
  }
}
</script>

<style lang="stylus" scoped>
.navs
  display flex
  align-items center

.rewind-button
  height 23px
  cursor pointer
  margin 0 18px 0 0

.backward-button
  height 14px
  cursor pointer
  margin 0 18px 0 0

.main-button
  cursor pointer
  width 28px
  height 28px

.forward-button
  height 14px
  cursor pointer
  margin 0 0 0 18px

.fastforward-button
  height 23px
  cursor pointer
  margin 0 0 0 18px

.button
  cursor pointer
  padding 0
  background-color transparent
  border none
  outline none
  img
    height 100%

@media (max-width 768px)
  .rewind-button
    display none

  .backward-button
    display none

  .main-button
    width 40px
    height 40px

  .forward-button
    height 15px

  .fastforward-button
    display none
</style>
