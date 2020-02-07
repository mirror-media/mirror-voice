<template>
  <li class="list-item">
    <div
      :class="[
        'list-item__cover-wrapper',
        'cover-wrapper',
        `cover-wrapper--${imgSize}`
      ]"
    >
      <div
        class="cover-wrapper__play-icon-wrapper play-icon-wrapper"
        @click="$emit('clickPlayIconWrapper')"
      >
        <img
          class="play-icon-wrapper__img"
          src="~/assets/img/revamp/play-circle.svg"
          alt=""
        >
      </div>
      <img
        v-lazy="imgSrc"
        alt=""
        class="cover-wrapper__img"
      >
    </div>
    <nuxt-link
      class="list-item__info-wrapper info-wrapper"
      :to="to"
    >
      <div class="info-wrapper__info-texts info-texts">
        <h1
          class="info-texts__title"
          v-text="title"
        />
        <h2
          class="info-texts__subtitle"
          v-text="subtitle"
        />
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    imgSize: {
      type: String,
      default: 'smaller',
      validator(value) {
        return ['smaller', 'bigger'].includes(value)
      }
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  padding-bottom 10.5px
  &__info-wrapper
    margin 0 0 0 10.5px

.cover-wrapper
  position relative
  &--smaller
    width 100px
    height 100px
  &--bigger
    width 120px
    height 120px
  &__play-icon-wrapper
    position absolute
    left 0
    top 0
    width 100%
    height 100%
  &__img
    width 100%
    min-width 100%
    height 100%
    min-height 100%
    border-radius 5px
    object-fit cover

.play-icon-wrapper
  display flex
  justify-content center
  align-items center
  cursor pointer
  &__img
    width 24px
    height 24px

.info-wrapper
  display flex
  align-items center

.info-texts
  &__title
    margin 0
    font-size 13px
    font-weight normal
    color #FF6D2D
  &__subtitle
    margin 10px 0 0 0
    font-size 15px
    font-weight bold
    line-height 1.4
    text-align justify
    color #2E2526
    width 250px
    word-wrap break-word
    -webkit-line-clamp 2
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden

@media (max-width 768px)
  .cover-wrapper
    width 80px
    height 80px
    min-width 80px
    min-height 80px

  .info-texts
    &__title
      font-size 15px
      font-weight bold
      color #2E2526
    &__subtitle
      font-size 14px
      font-weight normal
      color #2E2526
      width 100%
</style>
