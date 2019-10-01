<template>
  <section class="section">
    <AppDiv class="about-content">
      <AppH1 :size="'large'">
        關於我們
      </AppH1>
      <div class="about-content__body" v-html="$t('about')" />
    </AppDiv>
  </section>
</template>

<script>
import AppDiv from '~/components/AppDiv.vue'
import AppH1 from '~/components/AppH1.vue'

export default {
  components: {
    AppDiv,
    AppH1
  },
  head() {
    return this.$constructMeta({
      title: '關於我們',
      'og:url': this.$route.path
    })
  }
}
</script>

<style lang="stylus" scoped>
.section
  max-width 724px
  margin 0 auto

.about-content
  &__body
    margin 24px 0 0 0
    color #7d7d7d
    font-size 16px
    line-height 1.75
    text-align justify
    & >>> *
      margin 25px 0 0 0
    & >>> h2
      font-size 16px
      font-weight 400
    & >>> p
      display flex
      flex-direction column
    & >>> span
      margin 12px 0 0 0
    & >>> span:first-child
      margin 0
    & >>> .bold
      font-weight bold

@media (max-width 768px)
  .section
    max-width 100%
    margin 0

  .about-content
    padding 26px !important
    &__body
      margin 20px 0 0 0
      color black
      font-size 13px
      line-height 1.54
      & >>> *
        margin 10px 0 0 0
      & >>> h2
        font-size 13px
        font-weight 400
      & >>> span
        margin 5px 0 0 0
</style>
