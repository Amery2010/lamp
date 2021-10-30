const { expect } = require('chai')
const checkWebpFeature = require('../npm/checkWebpFeature')

class Image {
  constructor () {
    this._src = ''
    this.width = 0
    this.height = 0
  }
  get src () {
    return this._src
  }
  set src (value) {
    this._src = value
    setTimeout(() => {
      if (this._src.indexOf('data:image/webp;base64,') === 0) {
        this.width = 1
        this.height = 1
        this.onload()
      } else {
        this.onerror()
      }
    }, 300)
  }
}

global.Image = Image

describe('测试 checkWebpFeature 函数', () => {
  it('对于支持 lossy 格式 Webp 的浏览器应该返回 true', () => {
    checkWebpFeature('lossy').then(data => {
      expect(data).to.be.true
    })
  })
})
