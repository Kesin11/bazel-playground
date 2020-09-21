import { intList } from "./int_list"
import { Printer } from "./printer"

const main = () => {
  const list = intList(9)

  const printer = new Printer()
  list.forEach((i) => {
    printer.print(i)
  })
}
main()