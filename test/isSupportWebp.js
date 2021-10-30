const { expect } = require('chai')
const isSupportWebp = require('../npm/isSupportWebp')

global.document = window.document

describe('测试 isSupportWebp 函数', () => {
  it('对于支持 Webp 的浏览器应该返回 true', () => {
    global.document = {
      createElement: (type) => {
        if (type === 'canvas') {
          return {
            toDataURL: (type) => {
              if (type === 'image/webp') {
                return 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAAKwEAlQAAQUxQSBIAAAABBxARERCQJP7/H0X0P+1/QwBWUDgggAAAAHANAJ0BKiwBlgA+0WixUygmJKKgKAEAGglpbuF2sRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99qwAAP7/jAwAAAAAAAAA'
              } else {
                return ''
              }
            }
          }
        } else {
          throw new Error('Not support this type')
        }
      }
    }
    expect(isSupportWebp()).to.be.true
  })
  it('对于不支持 Webp 的浏览器应该返回 false', () => {
    global.document = {
      createElement: (type) => {
        if (type === 'canvas') {
          return {
            toDataURL: () => {
              throw new Error('Not Support this type')
            }
          }
        } else {
          throw new Error('Not support this type')
        }
      }
    }
    expect(isSupportWebp()).to.be.false
  })
})
