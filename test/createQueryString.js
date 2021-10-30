const { expect } = require('chai')
const createQueryString = require('../npm/createQueryString')

describe('测试 createQueryString 函数', () => {
  describe('可以生成常规链接字符串', () => {
    it('{ abc: 123 } 应该生成 abc=123', () => {
      expect(createQueryString({ abc: 123 })).to.equal('abc=123')
    })
    it('{ abc: 123, def: "text" } 应该生成 abc=123&def=text', () => {
      expect(createQueryString({ abc: 123, def: 'text' })).to.equal('abc=123&def=text')
    })
  })
  describe('可以生成带中文字符的链接字符串', () => {
    it('{ zh: "中文" } 应该生成 zh=%E4%B8%AD%E6%96%87', () => {
      expect(createQueryString({ zh: '中文' })).to.equal('zh=%E4%B8%AD%E6%96%87')
    })
  })
})
