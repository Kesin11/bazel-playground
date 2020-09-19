const { Printer } = require('./printer')
const { intList } = require('./int_list')

const main = () => {
  const list = intList(9)

  const printer = new Printer()
  list.forEach((i) => {
    printer.print(i)
  })
}
main()