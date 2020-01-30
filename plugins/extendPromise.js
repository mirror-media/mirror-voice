// For more info, check: https://stackoverflow.com/questions/30569182/promise-allsettled-in-babel-es6-implementation
if (!Object.prototype.hasOwnProperty.call(Promise, 'allSettled')) {
  Promise.allSettled = promises => {
    const wrappedPromises = promises.map(p =>
      Promise.resolve(p).then(
        val => ({ status: 'fulfilled', value: val }),
        err => ({ status: 'rejected', reason: err })
      )
    )
    return Promise.all(wrappedPromises)
  }
}
