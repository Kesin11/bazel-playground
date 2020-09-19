const _ = require('lodash')

class Printer {
  constructor() {
    this.count = 0
  }

  print(str) {
    console.log(`[${this.count}]: ${str}`)
    this.count++
  }

  prints(arr) {
    _.forEach(arr, (str) => {
      this.print(str)
    })
  }
}

module.exports = {
  Printer
}