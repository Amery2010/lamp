const { expect } = require('chai')
const getCharLength = require('../npm/getCharLength')

describe('测试 getCharLength 函数', () => {
  it('可以获取数字 12331 的字符长度为 5', () => {
    expect(getCharLength('12331')).to.be.equal(5)
  })
  it('可以获取字母 "abc" 的字符长度为 3', () => {
    expect(getCharLength('abc')).to.be.equal(3)
  })
  it('可以获取字母数字混合文本 "abc123" 的字符长度为 6', () => {
    expect(getCharLength('abc123')).to.be.equal(6)
  })
  it('可以获取中文文本 "中文" 的字符长度为 4', () => {
    expect(getCharLength('中文')).to.be.equal(4)
  })
  it('可以获取中文和英文的混合文本 "中文English" 的字符长度为 11', () => {
    expect(getCharLength('中文English')).to.be.equal(11)
  })
  it('可以获取中文、英文和字母的混合文本 "中文2019Jliguala" 的字符长度为 16', () => {
    expect(getCharLength('中文2019Jliguala')).to.be.equal(16)
  })
})
