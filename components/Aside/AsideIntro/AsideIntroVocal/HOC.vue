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
    vocal() {
      return _.get(this.data, ['vocals', 0], {})
    },
    fig() {
      return _.get(this.$getImgs(this.vocal), ['mobile', 'url'], '')
    },
    figcaption() {
      return _.get(this.vocal, 'name', '')
    },
    description() {
      return sanitizeContent(_.get(this.vocal, ['bio', 'html'], ''), 'aside')
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
