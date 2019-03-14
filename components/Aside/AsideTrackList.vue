<template>
  <AppDiv
    class="aside__wrapper album-relateds-wrapper"
  >
    <DivHeader class="album-relateds-wrapper__header">
      <nuxt-link
        slot="left"
        :to="`/album/${albumName}`"
      >
        同專輯的其他音檔
      </nuxt-link>
      <nuxt-link
        slot="right"
        class="album"
        :to="`/album/${albumName}`"
      >
        更多
      </nuxt-link>
    </DivHeader>
    <TrackList
      class="album-relateds-wrapper__track-list"
      :tracks="tracks"
      :items-per-page="5"
      :total="5"
      :current-sound="currentSound"
      :is-playing="isPlaying"
      @playTrack="v => $emit('playTrack', v)"
    />
  </AppDiv>
</template>

<script>
import _ from 'lodash'

import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import TrackList from '~/components/Track/TrackList.vue'

export default {
  components: {
    AppDiv,
    DivHeader,
    TrackList
  },
  props: {
    album: {
      type: Object,
      default() {
        return {}
      }
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
  },
  computed: {
    albumName() {
      return _.get(this.album, 'name', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.album-relateds-wrapper
  padding 25px 8px 7px 8px !important
  &__header
    margin 0 17px
  &__track-list
    margin 20px 0 0 0

.album
  font-size 14px
  color #7d7d7d
  cursor pointer

@media (max-width 768px)
  .album-relateds-wrapper
    padding 17px 5px 0px 5px !important
    &__header
      margin 0 8px
    &__track-list
      margin 17px 0 0 0

  .album
    font-size 11px
    text-decoration underline
</style>
