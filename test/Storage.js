const { expect } = require('chai')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM('', {
  url: "https://www.jiliguala.com/",
  contentType: "text/html",
  storageQuota: 5000000
})
const Storage = require('../npm/Storage')

// 将 window 对象注册到 global 上
global.window = window

describe('测试 Storage 类', () => {
  describe('测试能否正常初始化', () => {
    it('当 new Storage("local") 时，应该可以成功创建对象', () => {
      new Storage('local')
      const testLocalStorage = () => {
        if (typeof JSON.parse(window.localStorage.getItem('JLGL_local')) !== 'object') {
          throw new Error('无法在 localStorage 上存储数据！')
        }
      }
      expect(testLocalStorage).to.not.throw()
    })
    it('当 new Storage("session", "sessionStorage") 时，应该可以成功创建对象', () => {
      new Storage('session')
      const testSessionStorage = () => {
        if (typeof JSON.parse(window.sessionStorage.getItem('JLGL_session')) !== 'object') {
          throw new Error('无法在 localStorage 上存储数据！')
        }
      }
      expect(testSessionStorage).to.not.throw()
    })
    it('当 new Storage("local", "errorStorage") 时，应该无法创建对象', () => {
      const testErrorStorage = () => {
        try {
          new Storage('local', 'errorStorage')
        } catch (err) {
          throw new TypeError('不支持 localStorage 和 sessionStorage 以外的类型!')
        }
      }
      expect(testErrorStorage).to.throw(TypeError, '不支持 localStorage 和 sessionStorage 以外的类型!')
    })
    it('当 new Storage("local", "sessionStorage") 时，应该能获得 type 属性为 "sessionStorage" 的对象', () => {
      expect(new Storage('local', 'sessionStorage')).to.have.property('type', 'sessionStorage')
    })
    it('当 new Storage("local", "localStorage", "TestJLGL") 时，应该能获得 namespaces 属性为 "TestJLGL_local" 的对象', () => {
      expect(new Storage('local', 'localStorage', 'TestJLGL')).to.have.property('namespaces', 'TestJLGL_local')
    })
  })
  describe('测试 storage 上的方法是否有效', () => {
    describe('测试 set 方法', () => {
      it('可以使用 set 方法设置数值属性', () => {
        const local = new Storage('local')
        local.set('number', 123)
        const storage = JSON.parse(window.localStorage.getItem('JLGL_local'))
        expect(local.store.number).to.equal(storage.number)
      })
      it('可以使用 set 方法设置属性', () => {
        const local = new Storage('local')
        local.set('text', 'text')
        const storage = JSON.parse(window.localStorage.getItem('JLGL_local'))
        expect(local.store.text).to.equal(storage.text)
      })
      it('可以使用 set 方法设置对象属性', () => {
        const local = new Storage('local')
        const obj = { a: 123, b: 'b', c: [1, 2, 3]}
        local.set('obj', obj)
        const storage = JSON.parse(window.localStorage.getItem('JLGL_local'))
        expect(local.store.obj.a).to.eql(storage.obj.a)
      })
    })
    describe('测试 get 方法', () => {
      it('可以使用 get 方法获取数值属性', () => {
        const local = new Storage('local')
        local.set('number', 123)
        const storage = JSON.parse(window.localStorage.getItem('JLGL_local'))
        expect(local.get('number')).to.equal(storage.number)
      })
      it('可以使用 get 方法获取文本属性', () => {
        const local = new Storage('local')
        local.set('text', 'text')
        const storage = JSON.parse(window.localStorage.getItem('JLGL_local'))
        expect(local.get('text')).to.equal(storage.text)
      })
      it('可以使用 get 方法获取对象属性', () => {
        const local = new Storage('local')
        local.set('obj', { a: 123, b: 'b', c: [1, 2, 3]})
        const storage = JSON.parse(window.localStorage.getItem('JLGL_local'))
        expect(local.get('obj')).to.eql(storage.obj)
      })
    })
    describe('测试 remove 方法', () => {
      it('可以使用 remove 方法移除 obj 属性', () => {
        const local = new Storage('local')
        const obj = { a: 123, b: 'b', c: [1, 2, 3]}
        local.set('obj', obj)
        local.remove('obj')
        expect(local.get('obj')).to.be.null
      })
    })
    describe('测试 clear 方法', ()  => {
      it('可以使用 clear 方法清空数据', () => {
        const local = new Storage('local')
        local.set('number', 123)
        local.set('text', 'text')
        local.set('obj', { a: 123, b: 'b', c: [1, 2, 3]})
        local.clear()
        expect(local.store).to.be.eql(Object.create(null))
      })
    })
  })
})
