<template>
  <HOC
    :album="album"
    :tracks="tracks"
  >
    <Presentational
      slot-scope="{
        albumName,
        trackItems
      }"
      :album="album"
      :album-name="albumName"
      :tracks="trackItems"
      :current-sound="currentSound"
      :is-playing="appPlayer.isPlaying"
      @playTrack="v => $emit('playTrack', v)"
      @clickAlbum="$emit('clickAlbum')"
      @clickAlbumMore="$emit('clickAlbumMore')"
    />
  </HOC>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

import HOC from './HOC.vue'
import Presentational from './Presentational.vue'

export default {
  components: {
    HOC,
    Presentational
  },
  props: {
    album: {
      type: Object,
      default() {
        return {}
      }
    },
    tracks: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'appPlayer/LIST'
    }),
    ...mapState(['appPlayer']),
    currentSound() {
      return _.get(this.list, this.appPlayer.playingIndex, {})
    }
  }
}
</script>
