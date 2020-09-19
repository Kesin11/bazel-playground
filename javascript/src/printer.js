class Printer {
  constructor() {
    this.count = 0
  }

  print(str) {
    console.log(`[${this.count}]: ${str}`)
    this.count++
  }
}

module.exports = {
  Printer
}