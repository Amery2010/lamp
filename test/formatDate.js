const { expect } = require('chai')
const formatDate = require('../npm/formatDate')

describe('测试 formatDate 函数', () => {
  describe('测试默认的时间格式化字符串 yyyy-mm-dd HH:MM:ss', () => {
    it('formatDate(1569464365129) 应该返回 "2019-09-26 10:19:25"', () => {
      expect(formatDate(1569464365129)).to.equal('2019-09-26 10:19:25')
    })
  })
  describe('测试指定类型的格式化字符串 yyyy-mm-dd', () => {
    it('formatDate(1569464365129, "yyyy-mm-dd") 应该 "2019-09-26"', () => {
      expect(formatDate(1569464365129, 'yyyy-mm-dd')).to.equal('2019-09-26')
    })
  })
  describe('测试带毫秒的时间格式', () => {
    it('formatDate(1569464365129, "HH:MM:ss.L") 应该 "10:19:25.13"', () => {
      expect(formatDate(1569464365129, 'HH:MM:ss.L')).to.equal('10:19:25.13')
    })
  })
  describe('测试时间简写形式', () => {
    it('formatDate(1569464365129, "m/d/yy") 应该 "9/26/19"', () => {
      expect(formatDate(1569464365129, 'm/d/yy')).to.equal('9/26/19')
    })
  })
  describe('测试中文日期格式', () => {
    it('formatDate(1569464365129, "yyyy年m月dd日") 应该 "2019年9月26日"', () => {
      expect(formatDate(1569464365129, 'yyyy年m月dd日')).to.equal('2019年9月26日')
    })
  })
  describe('测试中文时间格式', () => {
    it('formatDate(1569488486249, "ddd TTh:MM") 应该 "周四 下午5:01"', () => {
      expect(formatDate(1569488486249, 'ddd TTh:MM')).to.equal('周四 下午5:01')
    })
  })
})
