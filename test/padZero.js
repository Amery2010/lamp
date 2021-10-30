const { expect } = require('chai')
const padZero = require('../npm/padZero')

describe('测试 padZero 函数', () => {
  it('单个数字默认补齐 2 位', () => {
    expect(padZero(2)).to.be.equal('02')
  })
  it('超过 2 位的数值默认返回其字符串形式', () => {
    expect(padZero(555)).to.be.equal('555')
  })
  it('设置补齐 6 位，不足 6 位前置追加 0', () => {
    expect(padZero(245, 6)).to.be.equal('000245')
  })
  it('可以对数值文本进行补齐', () => {
    expect(padZero('7')).to.be.equal('07')
  })
})
