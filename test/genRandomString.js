const { expect } = require('chai')
const genRandomString = require('../npm/genRandomString')

describe('测试 genRandomString 函数', () => {
  it('可以生成指定位数的随机字符串', () => {
    expect(genRandomString(8)).to.have.lengthOf(8)
    expect(genRandomString(16)).to.have.lengthOf(16)
  })

  it('生成的字符串只包含数字和字母', () => {
    expect(genRandomString(12)).to.match(/^[0-9A-Za-z]+$/)
  })
})
