<script>
import _ from 'lodash'

export default {
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
    albumName() {
      return _.get(this.album, 'name', '')
    },
    trackItems() {
      return _.get(this.tracks, 'items', [])
    }
  },
  render() {
    return this.$scopedSlots.default({
      albumName: this.albumName,
      trackItems: this.trackItems
    })
  }
}
</script>
