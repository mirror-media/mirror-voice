const titleSuffix = '鏡語音 Mirror Voice'
const baseUrl = 'https://voice.mirrormedia.mg'

/* 
** Construct metas by mutable names and properties:
** title, og:title, description, og:description, og:image, og:url
** if some of the values are missing, it will fall back to default in nuxt.config.js
*/
export default (content, inject) => {
  inject('constructMeta', (object = {}) => {
    const result = { meta: [] }

    if (object.title) {
      result.title = `${object.title} - ${titleSuffix}`
      result.meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: `${object.title} - ${titleSuffix}`
      })
    }
    if (object.description) {
      result.meta.push({
        hid: 'description',
        name: 'description',
        content: object.description
      })
      result.meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: object.description
      })
    }
    if (object['og:image']) {
      result.meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: object['og:image']
      })
    }
    if (object['og:url']) {
      result.meta.push({
        hid: 'og:url',
        property: 'og:url',
        content: `${baseUrl}${object['og:url']}`
      })
    }

    return result
  })
}
