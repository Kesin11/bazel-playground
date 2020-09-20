const { intList } = require('../src/int_list')

describe('intList', () => {
  it('should return 9 seq number when argument is 10', () => {
    expect(intList(10)).toEqual([1,2,3,4,5,6,7,8,9])
  });

  it('should return 1 seq when argument is 0', () => {
    expect(intList(0)).toEqual([1])
  });
});