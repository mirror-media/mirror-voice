<template>
  <div :class="[ 'player', `player--${type}` ]">
    <div
      v-if="type === 'long'"
      class="player__cover cover"
    >
      <img class="cover__img" src="" alt="">
    </div>
    <PlayerNavs
      class="player__navs"
      :showNav="type === 'long'"
      @backward="''"
      @pause="''"
      @play="''"
      @forward="''"
    />
    <div :class="['player__middle', 'middle', `middle--${type}`]">
      <PlayerInfo
        class="middle__info"
        :showTitle="type === 'long'"
      />
      <PlayerProgress
        class="middle__progress"
      />
    </div>
    <PlayerRate
      class="player__rate"
    />
    <PlayerVolume
      v-if="type === 'long'"
      class="player__volume"
    />
  </div>
</template>

<script>
import PlayerNavs from './PlayerNavs.vue'
import PlayerInfo from './PlayerInfo.vue'
import PlayerProgress from './PlayerProgress.vue'
import PlayerRate from './PlayerRate.vue'
import PlayerVolume from './PlayerVolume.vue'

export default {
  props: {
    type: {
      type: String,
      default: 'short',
      validator(value) {
        return ['short', 'long'].includes(value)
      }
    }
  },
  components: {
    PlayerNavs,
    PlayerInfo,
    PlayerProgress,
    PlayerRate,
    PlayerVolume
  }
}
</script>

<style lang="stylus" scoped>
.player
  display flex
  align-items center
  height 60px
  background-color #313131
  &--short
    padding 16px 15px 16px 23px
    max-width 724px
  &--long
    max-width 1000px
  &__cover
    margin 0 31px 0 0
  &__middle
    margin 0 0 0 25px
  &__rate
    margin 0 0 0 20px
  &__volume
    margin 0 0 0 28px

.cover
  d = 34px
  width d
  height d
  background-color black
  // &__img

.middle
  display flex
  flex-direction column
  &--short
    width 566px
  &--long
    width 700px
  &__progress
    margin 10px 0 0 0
</style>
