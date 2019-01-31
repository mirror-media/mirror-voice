<template>
  <div class="info">
    <AppH1
      class="info__title"
      :size="'large'"
      :weight="'bold'"
    >
      有效的家庭關係
    </AppH1>
    <AppDate class="info__date"/>
    <div class="info__basic">
      <span>主播： 網路水手、網路水手、網路水手</span>
      <span>原著： 邁克・貝克特爾、邁克・貝克特爾、邁克・貝克特爾</span>
    </div>
    <div class="info__tags tags">
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
      <AppTag class="tags__tag"/>
    </div>
  </div>
</template>

<script>
import AppH1 from '~/components/AppH1.vue'
import AppDate from '~/components/AppDate.vue'
import AppTag from '~/components/AppTag.vue'

export default {
  components: {
    AppH1,
    AppDate,
    AppTag
  }
}
</script>

<style lang="stylus" scoped>
.info
  &__date
    margin 19px 0 0 0
  &__basic
    margin 16px 0 0 0
    display flex
    flex-wrap wrap
    line-height 1.71
    span
      font-size 14px
      color #7d7d7d
    span + span
      margin 0 0 0 40px
  &__tags
    display flex
    margin 7px 0 0 0
    position relative
    left -12px

.tags
  flex-wrap wrap
  &__tag
    margin 12px 0 0 12px
</style>
