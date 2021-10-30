const { expect } = require('chai')
const isEmail = require('../npm/isEmail')

describe('测试 isEmail 函数', () => {
  it('abc.def@jiliguala.com 可以通过验证', () => {
    expect(isEmail('abc.def@jiliguala.com')).to.be.true
  })
  it('abc@def 无法通过验证', () => {
    expect(isEmail('abc@def')).to.be.false
  })
})
