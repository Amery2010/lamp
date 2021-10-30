const { expect } = require('chai')
const queryString = require('../npm/queryString')

describe('测试 queryString 函数', () => {
  describe('解析 location.search 形式的文本', () => {
    it('?aid=test 应该解析为 { aid: "test" }', () => {
      expect(queryString('?aid=test')).to.be.eql({ aid: 'test' })
    })
    it('?aid=test&lottery_type=wheel 应该解析为 { aid: "test", lottery_type: "wheel" }', () => {
      expect(queryString('?aid=test&lottery_type=wheel')).to.be.eql({ aid: 'test', lottery_type: 'wheel' })
    })
  })
  describe('解析不带 ? 形式的文本', () => {
    it('aid=test 应该解析为 { aid: "test" }', () => {
      expect(queryString('aid=test')).to.be.eql({ aid: 'test' })
    })
    it('aid=test&lottery_type=wheel 应该解析为 { aid: "test", lottery_type: "wheel" }', () => {
      expect(queryString('aid=test&lottery_type=wheel')).to.be.eql({ aid: 'test', lottery_type: 'wheel' })
    })
  })
  describe('解析特殊类型的参数', () => {
    it('name=%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95 应该解析为 { name: "中文测试" }', () => {
      expect(queryString('name=%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95')).to.be.eql({ name: '中文测试' })
    })
    it('plus=a%2Bb%2Bc 应该解析为 { plus: "a+b+c" }', () => {
      expect(queryString('plus=a%2Bb%2Bc')).to.be.eql({ plus: 'a+b+c' })
    })
  })
})

