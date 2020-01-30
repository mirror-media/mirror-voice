<script>
import _ from 'lodash'
import sanitizeContent from '~/plugins/util/sanitizeContent'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    fig() {
      return _.get(this.$getImgs(this.data), ['mobile', 'url'], '')
    },
    figcaption() {
      return _.get(this.data, 'title', '')
    },
    description() {
      return sanitizeContent(_.get(this.data, ['brief', 'html'], ''), 'aside')
    }
  },
  render() {
    return this.$scopedSlots.default({
      fig: this.fig,
      figcaption: this.figcaption,
      description: this.description
    })
  }
}
</script>
