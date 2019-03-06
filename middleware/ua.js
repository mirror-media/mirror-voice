export default function({ store, req }) {
  if (process.server) {
    store.commit('appUA/SET_UA', req.useragent)
  }
}
