import { storage, selectAB } from './persistence'
import { randomCandidate } from './toolbox'

const VueAB = {
  abtest: selectAB,
  randomCandidate,
  install(Vue, options = {}) {
    if (options.storage) {
      const cfg = options.storage
      if (cfg.name) storage.name = cfg.name
      if (cfg.method) storage.method = cfg.method
      if (cfg.isUniversal) storage.isUniversal = cfg.isUniversal
      if (cfg.expiry) storage.expiry = parseInt(cfg.expiry)
    }

    Vue.component(options.component || 'split-test', {
      functional: true,
      /* eslint-disable vue/require-default-prop */
      props: {
        always: String,
        name: String
      },
      render(h, ctx) {
        const name = ctx.props.name || ctx.parent.$options.name
        /* eslint-disable no-throw-literal */
        if (!name) throw 'VueA2B Error: The test name is mandatory!'

        const variations = ctx.slots()
        const winner =
          ctx.props.always ||
          storage.entry[name] ||
          randomCandidate(ctx.children)

        storage.entry = { name, winner }
        return variations[winner]
      }
    })

    Vue.mixin({
      data() {
        return {
          abWinner: ''
        }
      },
      beforeCreate() {
        const option = this.$options.abtest
        if (option) {
          this.$abtest = (name, variants) => {
            const winner = selectAB(name, variants)

            // Wrap in nextTick, avoid this.$ga undefined issue
            this.$nextTick(() => {
              this.$ga.set('contentGroup1', `${name} ${winner}`)
            })
            return winner
          }
        }
      },
      mounted() {
        const option = this.$options.abtest
        if (option) {
          const { name = 'abtest', variants = {} } = option
          this.abWinner = this.$abtest(name, variants)
        }
      }
    })
  }
}

export default VueAB
