const { expect } = require('chai')
const formatSize = require('../npm/formatSize')

describe('测试 formatSize 函数', () => {
  it('1024 * 600.55 应该格式化为 "600.55KB"', () => {
    expect(formatSize(1024 * 600.55)).to.be.equal('600.55KB')
  })
  it('1024 * 1024 * 1024 + 1 应该格式化为 "1.00GB"', () => {
    expect(formatSize(1024 * 1024 * 1024 + 24)).to.be.equal('1.00GB')
  })
  it('1024 * 1024 * 1024, 0 应该格式化为 "1GB"', () => {
    expect(formatSize(1024 * 1024 * 1024, 0)).to.be.equal('1GB')
  })
  it('1024 * 1024 * 1024 - 1, 2, ["B", "K", "M", "G"] 应该格式化为 "1024.00M"', () => {
    expect(formatSize(1024 * 1024 * 1024 - 1, 2, ['B', 'K', 'M', 'G'])).to.be.equal('1024.00M')
  })
})
