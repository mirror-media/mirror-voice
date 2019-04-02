<script>
import _ from 'lodash'
import sanitizeHtml from 'sanitize-html'

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
      return sanitizeHtml(
        _.get(this.data, ['brief', 'html'], ''),
        this.$SANITIZE_HTML_DEFAULT_OPTIONS
      )
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
