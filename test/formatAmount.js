const { expect } = require('chai')
const formatAmount = require('../npm/formatAmount')

describe('测试 formatAmount 函数', () => {
  it('320020 应该格式化为 "3,200.20"', () => {
    expect(formatAmount(320020)).to.be.equal('3,200.20')
  })
  it('"203357" 应该格式化为 "2,033.57"', () => {
    expect(formatAmount('203357')).to.be.equal('2,033.57')
  })
})
