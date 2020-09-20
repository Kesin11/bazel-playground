const { Printer } = require('../src/printer')

describe('printer', () => {
  it('should count is 0 when just created', () => {
    const printer = new Printer()
    expect(printer.count).toEqual(0)
  });

  it('should count is 1 after call print one time', () => {
    const printer = new Printer()
    printer.print('foo')

    expect(printer.count).toEqual(1)
  });

  it('should count is 2 after call prints with length 2', () => {
    const printer = new Printer()
    printer.prints(['foo', 'bar'])

    expect(printer.count).toEqual(2)
  });
});