const { expect } = require('chai')
const shuffle = require('../npm/shuffle')

describe('测试 shuffle 函数', () => {
  it('可以将数组随机排序', () => {
    expect(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).to.not.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('每次生成的数组都不相同', () => {
    expect(shuffle(['a', 'b', 'c', 'd', 'e', 'f'])).to.not.eql(shuffle(['a', 'b', 'c', 'd', 'e', 'f']))
  })
  it('可以对复杂的数组使用', () => {
    expect(shuffle([0, '1', 'a', { B: 'b'}, ['c', 'd'], 5])).to.not.eql([0, '1', 'a', { B: 'b'}, ['c', 'd'], 5])
  })
})
