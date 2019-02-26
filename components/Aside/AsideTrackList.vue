<template>
  <AppDiv
    class="aside__wrapper album-relateds-wrapper"
    :padding="'25px 8px 7px 8px'"
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
  &__header
    margin 0 17px
  &__track-list
    margin 20px 0 0 0

.album
  font-size 14px
  color #7d7d7d
  cursor pointer
</style>
