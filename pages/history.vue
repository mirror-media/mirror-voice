<template>
  <section
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
        :is-playing="appPlayer.audioIsPlaying"
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
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

import AppDiv from '~/components/AppDiv.vue'
import DivHeader from '~/components/Div/DivHeader.vue'
import BaseTrackList from '~/components/BaseTrackList.vue'

export default {
  components: {
    AppDiv,
    DivHeader,
    BaseTrackList
  },
  data() {
    return {
      isTracksSortLatestFirst: true
    }
  },
  computed: {
    ...mapState(['appPlayer']),

    currentSound() {
      return _.get(
        this.appPlayer.audioList,
        this.appPlayer.audioCurrentIndex,
        {}
      )
    },

    ...mapState({
      localStorageTrackHistory: state => state.localStorageTrackHistory.dict
    }),
    tracks() {
      if (_.isEmpty(this.localStorageTrackHistory)) {
        return []
      }
      const sortFunction = this.isTracksSortLatestFirst
        ? (a, b) => new Date(b.memorizedDate) - new Date(a.memorizedDate)
        : (a, b) => new Date(a.memorizedDate) - new Date(b.memorizedDate)
      return Object.values(this.localStorageTrackHistory)
        .map(value => {
          const duration = _.get(value, 'memorizedDuration', 0)
          const playedTime = _.get(value, 'memorizedCurrentTime', 0)
          const playedProgress = duration !== 0 ? playedTime / duration : 0
          return {
            ...value,
            duration,
            playedTime,
            playedProgress
          }
        })
        .slice()
        .sort(sortFunction)
    },
    total() {
      return this.tracks.length
    }
  },
  methods: {
    ...mapActions({
      RESET_AUDIO_LIST: 'appPlayer/RESET_AUDIO_LIST'
    }),
    playTrack(slug) {
      const singleItem = _.find(this.tracks, o => {
        const _slug = _.get(o, 'slug', '')
        return _slug === slug
      })
      this.RESET_AUDIO_LIST({
        list: [singleItem],
        autoPlay: true,
        updateTime: singleItem.memorizedCurrentTime
      })

      const scrollToSelector = this.isTracksSortLatestFirst
        ? '.header'
        : '.footer'
      this.$scrollTo(scrollToSelector, 1000)
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
