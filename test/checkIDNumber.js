const { expect } = require('chai')
const checkIDNumber = require('../npm/checkIDNumber')

describe('测试 checkIDNumber 函数', () => {
  it('11010519491231002X 为正常的身份证号码', () => {
    expect(checkIDNumber('11010519491231002X')).to.be.true
  })
  it('123456789123456789 为错误的身份证号码', () => {
    expect(checkIDNumber('123456789123456789')).to.be.false
  })
  it('110105194912310021 的校验码错误', () => {
    expect(checkIDNumber('110105194912310021')).to.be.false
  })
  it('431025198813146919 的生日日期错误', () => {
    expect(checkIDNumber('431025198813146919')).to.be.false
  })
  it('110105194902310026 的生日日期错误', () => {
    expect(checkIDNumber('110105194902310026')).to.be.false
  })
  it('160105194912310029 的省份存在问题', () => {
    expect(checkIDNumber('160105194912310029')).to.be.false
  })
  it('11010519491231002X 限定省份为北京', () => {
    expect(checkIDNumber('11010519491231002X', '北京')).to.be.true
  })
  it('11010519491231002X 限定省份为浙江，应该无法通过校验', () => {
    expect(checkIDNumber('11010519491231002X', '浙江')).to.be.false
  })
})
