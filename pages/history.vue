<template>
  <section
    v-infinite-scroll="loadmore"
    class="history"
  >
    <AppDiv
      class="tracks-wrapper"
    >
      <DivHeader class="tracks-wrapper__header">
        <template slot="left">
          收聽紀錄（{{ total }}）
        </template>
        <div
          slot="right"
          class="sorts"
        >
          <button
            :class="[
              'sorts__sort',
              { 'sorts__sort--dimmed': isTracksSortLatestFirst }
            ]"
            @click="isTracksSortLatestFirst = true"
          >
            最新
          </button>
          <button
            :class="[
              'sorts__sort',
              { 'sorts__sort--dimmed': !isTracksSortLatestFirst }
            ]"
            @click="isTracksSortLatestFirst = false"
          >
            最舊
          </button>
        </div>
      </DivHeader>
      <BaseTrackList
        class="tracks-wrapper__tracks"
        :show-list-order="true"
        :show-vocals="true"
        :show-played-progress="true"
        :is-latest-first="isTracksSortLatestFirst"
        :current-sound="currentSound"
        :is-playing="appPlayer.isPlaying"
        :tracks="tracks"
        :page="1"
        :total="total"
        :items-per-page="$LOCAL_STORAGE_HISTORY_LIMIT"
        :relative-time-by="'memorizedDate'"
        @playTrack="playTrack"
      />
    </AppDiv>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
import Vue from 'vue'

import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import BaseTrackList from '~/components/BaseTrackList.vue'

if (process.browser) {
  const infiniteScroll = require('vue-infinite-scroll')
  Vue.use(infiniteScroll)
}

export default {
  components: {
    AppDiv,
    DivHeader,
    BaseTrackList
  },
  data() {
    return {
      isTracksSortLatestFirst: true,
      tracksLimit: 10
    }
  },
  computed: {
    ...mapState(['appPlayer']),

    ...mapGetters({
      list: 'appPlayer/LIST'
    }),
    currentSound() {
      return _.get(this.list, this.appPlayer.playingIndex, {})
    },

    ...mapState({
      localStorageTrackHistory: state =>
        state.localStorageTrackHistory.trackHistory
    }),
    tracks() {
      let tracks = this.localStorageTrackHistory.map(track => {
        const duration = _.get(track, 'lastTrackDurationTime', 0)
        const playedTime = _.get(track, 'lastTrackPlayedTime', 0)
        const playedProgress = duration !== 0 ? playedTime / duration : 0
        return {
          ..._.get(track, 'lastTrackStorage', {}),
          duration,
          playedTime,
          playedProgress
        }
      })
      tracks = this.isTracksSortLatestFirst ? tracks.slice().reverse() : tracks
      return _.take(tracks, this.tracksLimit)
    },
    total() {
      return this.localStorageTrackHistory.length
    }
  },
  methods: {
    loadmore() {
      if (this.tracksLimit < this.$LOCAL_STORAGE_HISTORY_LIMIT) {
        this.tracksLimit += 10
      }
    },

    ...mapActions({
      PREPARE_SINGLES: 'appPlayer/PREPARE_SINGLES'
    }),
    ...mapMutations({
      SET_PLAYING_INDEX: 'appPlayer/SET_PLAYING_INDEX',
      SET_PLAYED_TIME: 'appPlayer/SET_PLAYED_TIME',
      SET_ALBUM_ID: 'appPlayer/SET_ALBUM_ID',
      SET_ALBUM_COVER: 'appPlayer/SET_ALBUM_COVER',
      CLEAR_PAGES: 'appPlayer/CLEAR_PAGES'
    }),
    playTrack(slug) {
      const single = _.find(this.tracks, o => {
        const _slug = _.get(o, 'slug', '')
        return _slug === slug
      })
      this.SET_ALBUM_ID('')
      this.SET_ALBUM_COVER('')
      this.CLEAR_PAGES()
      this.SET_PLAYED_TIME(_.get(single, 'playedTime', 0))
      this.PREPARE_SINGLES({ page: 1, res: { items: [single] } }).then(() => {
        this.SET_PLAYING_INDEX(0)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.history
  max-width 1000px
  margin 0 auto

.sorts
  &__sort
    border none
    background-color transparent
    padding 0 14px
    line-height 1
    font-size 14px
    color #7d7d7d
    cursor pointer
    &--dimmed
      color black
    &:focus
      outline none
    &:first-child
      padding 0 14px 0 0
    &:last-child
      padding 0 0 0 14px
    & + &
      border-left 2px solid #7d7d7d

.tracks-wrapper
  min-height 555px
  position relative
  &__tracks
    margin 18px 0 0 0 !important

@media (max-width 768px)
  .history
    max-width 100%
    margin 0
    padding 12px
</style>
