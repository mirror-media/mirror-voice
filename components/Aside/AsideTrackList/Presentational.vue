<template>
  <div class="aside__wrapper album-relateds-wrapper">
    <DivHeader
      class="album-relateds-wrapper__header"
      :size="'tiny'"
    >
      <nuxt-link
        slot="left"
        :to="`/album/${albumName}`"
        @click.native="$emit('clickAlbum')"
      >
        同專輯的其他音檔
      </nuxt-link>
      <nuxt-link
        slot="right"
        class="album"
        :to="`/album/${albumName}`"
        @click.native="$emit('clickAlbumMore')"
      >
        更多
      </nuxt-link>
    </DivHeader>
    <BaseTrackList
      class="album-relateds-wrapper__track-list"
      :tracks="tracks"
      :items-per-page="5"
      :total="5"
      :current-sound="currentSound"
      :is-playing="isPlaying"
      @playTrack="v => $emit('playTrack', v)"
      @clickLink="$emit('clickLink')"
    />
  </div>
</template>

<script>
import DivHeader from '~/components/Div/DivHeader.vue'
import BaseTrackList from '~/components/BaseTrackList.vue'

export default {
  components: {
    DivHeader,
    BaseTrackList
  },
  props: {
    album: {
      type: Object,
      default() {
        return {}
      }
    },
    albumName: {
      type: String,
      default: ''
    },
    tracks: {
      type: Array,
      default() {
        return []
      }
    },
    currentSound: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    isPlaying: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.album-relateds-wrapper
  &__header
    margin 0 10px !important
  &__track-list
    margin 12px 0 0 0 !important

.album
  font-size 14px
  color #7d7d7d
  cursor pointer

@media (max-width 768px)
  .album-relateds-wrapper
    &__header
      margin 0 8px !important
    &__track-list
      margin 17px 0 0 0 !important

  .album
    font-size 11px
    text-decoration underline
</style>
