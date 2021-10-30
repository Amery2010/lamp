const { expect } = require('chai')
const uuid = require('../npm/uuid')

describe('测试 uuid 函数', () => {
  it('可以生成正确长度的 uuid 字符串', () => {
    expect(uuid()).to.have.lengthOf(36)
  })
  it('可以生成正确格式的 uuid 字符串', () => {
    expect(uuid()).to.match(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)
  })
  it('每次生成的 uuid 字符串都是不同的', () => {
    const firstUuid = uuid()
    const secondUuid = uuid()
    expect(firstUuid).to.be.not.equal(secondUuid)
  })
})