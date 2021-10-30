const { expect } = require('chai')
const getFileExtension = require('../npm/getFileExtension')

describe('测试 getFileExtension 函数', () => {
  it('可以获取字符串 filename 的拓展名为空字符串', () => {
    expect(getFileExtension('filename')).to.be.equal('')
  })
  it('可以获取字符串 filename.txt 的拓展名为 txt', () => {
    expect(getFileExtension('filename.txt')).to.be.equal('txt')
  })
  it('可以获取字符串 .hiddenfile 的拓展名为空字符串', () => {
    expect(getFileExtension('.hiddenfile')).to.be.equal('')
  })
  it('可以获取字符串 filename.with.many.dots.ext 的拓展名为 ext', () => {
    expect(getFileExtension('filename.with.many.dots.ext')).to.be.equal('ext')
  })
  it('可以获取字符串 中文文件名.txt 的拓展名为 txt', () => {
    expect(getFileExtension('中文文件名.txt')).to.be.equal('txt')
  })
})
