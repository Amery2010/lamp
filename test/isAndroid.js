const { expect } = require('chai')
const isAndroid = require('../npm/isAndroid')

describe('测试 isAndroid 函数', () => {
  it('对于非安卓设备应该返回 false', () => {
    global.navigator = {
      // iPhone 6/7/8 的 userAgent
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    }
    expect(isAndroid()).to.be.false
  })
  it('对于安卓设备应该返回 true', () => {
    global.navigator = {
      // Galaxy S5 的 userAgent
      userAgent: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Mobile Safari/537.36'
    }
    expect(isAndroid()).to.be.true
  })
})
