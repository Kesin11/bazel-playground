import _ from 'lodash'

export class Printer {
  count: number
  constructor() {
    this.count = 0
  }

  print(str: string | number) {
    console.log(`[${this.count}]: ${str}`)
    this.count++
  }

  prints(arr: (string | number)[]) {
    _.forEach(arr, (str) => {
      this.print(str)
    })
  }
}
