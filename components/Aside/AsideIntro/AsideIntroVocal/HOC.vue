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
      return sanitizeHtml(
        _.get(this.vocal, ['bio', 'html'], ''),
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
