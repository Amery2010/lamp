const { expect } = require('chai')
const compareVersion = require('../npm/compareVersion')

describe('测试 compareVersion 函数', () => {
  it('版本号 "1.0.2" 比版本号 "1.0.1" 高', () => {
    expect(compareVersion('1.0.2', '1.0.1')).to.equal(1)
  })
  it('版本号 "0.3.1" 比版本号 "1.2.1" 低', () => {
    expect(compareVersion('0.3.1', '1.2.1')).to.equal(-1)
  })
  it('版本号 "2.12" 与版本号 "2.12.0" 一致', () => {
    expect(compareVersion('2.12', '2.12.0')).to.equal(0)
  })
})
