const sendGA = (
  ga,
  { eventCategory = '', eventAction = '', eventLabel = '' }
) => {
  ga.event({
    eventCategory,
    eventAction,
    eventLabel
  })
}

export default (context, inject) => {
  // header event trackings
  inject('sendGAHeader', ({ action = '', label = '' }) => {
    sendGA(context.$ga, {
      eventCategory: 'header',
      eventAction: action,
      eventLabel: label
    })
  })

  // footer event trackings
  inject('sendGAFooter', ({ action = '', label = '' }) => {
    sendGA(context.$ga, {
      eventCategory: 'footer',
      eventAction: action,
      eventLabel: label
    })
  })

  // home page ga event trackings
  inject('sendGAHome', ({ action = '', label = '' }) => {
    sendGA(context.$ga, {
      eventCategory: 'home',
      eventAction: action,
      eventLabel: label
    })
  })

  // section/category page ga event trackings
  inject('sendGAListing', ({ action = '', label = '' }) => {
    sendGA(context.$ga, {
      eventCategory: 'listing',
      eventAction: action,
      eventLabel: label
    })
  })

  // album page ga event trackings
  inject('sendGAAlbum', ({ action = '', label = '' }) => {
    sendGA(context.$ga, {
      eventCategory: 'album',
      eventAction: action,
      eventLabel: label
    })
  })

  // single page ga event trackings
  inject('sendGASingle', ({ action = '', label = '' }) => {
    sendGA(context.$ga, {
      eventCategory: 'single',
      eventAction: action,
      eventLabel: label
    })
  })
}
