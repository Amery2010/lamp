/**
 * Store 接口
 * @interface Store
 */
interface Store {
  [propName: string]: any;
}

/**
 * Storage 接口
 * @interface Storage
 */
interface Storage {
  set (key: string, val: any): void;
  get (key: string): any;
  remove (key: string): void;
  clear (): void;
}

/**
 * strong 类型
 * 目前仅支持 localStorage 和 sessionStorage 两种类型，
 * 因为这两种类型的操作方法名是一致的，比较好统一
 */
type storageType = 'localStorage' | 'sessionStorage'

/**
 * 浏览器存储类
 * @interface IStorage
 * @example
 * ```
 * new Storage('local', 'sessionStorage') // 使用 sessionStorage 存储
 * new Storage('local', 'localStorage', 'TestJLGL') // 替换默认的存储前缀
 * ```
 * @author Amery
 * @version v0.1.1
 * @since v0.1.0
 */
class Storage implements Storage {
  /**
   * 存储类型，目前仅支持 localStorage 和 sessionStorage
   */
  protected type: storageType
  /**
   * 存储对象的命名空间，默认会添加 Lamp 前缀，
   * 为了避免意外覆盖其他项目所存储的同名变量
   */
  protected namespaces: string
  /**
   * Storage 的对象构造器
   * @param name 存储对象的名称
   * @param type 本地存储的类型，默认为 localStorage
   * @param prefix 存储对象的名称，用于生成命名空间，默认为 Lamp
   */
  constructor (
    name: string,
    type: storageType = 'localStorage',
    prefix = 'Lamp'
  ) {
    this.type = type
    // 存储对象的命名空间
    this.namespaces = `${prefix}_${name}`
    // 执行初始化函数
    this.init()
  }
  /**
   * 初始化函数
   * 主要用于判断本地存储是否存在同名的非对象属性
   */
  private init (): void {
    if (this.type !== 'localStorage' && this.type !== 'sessionStorage' ) {
      throw new Error('目前仅支持 localStorage 和 sessionStorage 两种类型')
    }
    const localstore: string | null = window[this.type].getItem(this.namespaces)
    if (localstore !== null) {
      const store = JSON.parse(localstore)
      if (typeof store !== 'object') {
        console.warn(`${this.type} 上已经存在名为 ${this.namespaces} 的属性，但该属性不是一个对象！`)
      }
    } else {
      this.save(Object.create(null))
    }
  }
  /**
   * 将修改内容存储到本地
   * @param store 修改后的对象
   */
  protected save (store: Store): void {
    window[this.type].setItem(this.namespaces, JSON.stringify(store))
  }
  /**
   * 存储对象
   * 自动获取存储对象
   */
  get store (): Store {
    const localstore: string | null = window[this.type].getItem(this.namespaces)
    if (localstore === null) {
      console.error(`${this.type} 上的 ${this.namespaces} 的属性被意外清理！`)
      return Object.create(null)
    }
    return JSON.parse(localstore)
  }
  /**
   * 设置属性
   * @param key 属性名
   * @param val 属性值
   */
  set (key: string, val: any): void {
    const store = { ...this.store }
    store[key] = val
    this.save(store)
  }
  /**
   * 获取属性
   * @param key 属性名
   */
  get (key: string): any {
    if (!(key in this.store)) return null
    return this.store[key]
  }
  /**
   * 移除属性
   * @param key 属性名
   */
  remove (key: string): void {
    const store = { ...this.store }
    if (key in store) delete store[key]
    this.save(store)
  }
  /**
   * 清理存储对象
   */
  clear (): void {
    this.save(Object.create(null))
  }
}

export default Storage
