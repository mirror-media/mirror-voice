<template>
  <ul class="list">
    <ListItem
      v-for="(item, i) in listItems"
      :key="i"
      class="list__list-item"
      :data="item"
      @click.native="$emit('clickListItem', item)"
    />
  </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

import ListItem from './ListItem/Container.vue'

export default {
  components: {
    ListItem
  },
  computed: {
    ...mapState({
      playingIndex: state => state.appPlayer.playingIndex
    }),
    ...mapGetters({
      list: 'appPlayer/LIST'
    }),
    listItems() {
      const filterOutCurrentSingle = this.list.filter(
        (item, i) => i !== this.playingIndex
      )
      const samples = _.sampleSize(filterOutCurrentSingle, 2)
      return samples
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  list-style none
  margin 0
  padding 0

@media (max-width 320px)
  .list
    &__list-item
      &:not(:nth-child(1))
        display none !important
</style>
