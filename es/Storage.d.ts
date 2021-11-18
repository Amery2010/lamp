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
    set(key: string, val: any): void;
    get(key: string): any;
    remove(key: string): void;
    clear(): void;
}
/**
 * strong 类型
 * 目前仅支持 localStorage 和 sessionStorage 两种类型，
 * 因为这两种类型的操作方法名是一致的，比较好统一
 */
declare type storageType = 'localStorage' | 'sessionStorage';
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
declare class Storage implements Storage {
    /**
     * 存储类型，目前仅支持 localStorage 和 sessionStorage
     */
    protected type: storageType;
    /**
     * 存储对象的命名空间，默认会添加 Lamp 前缀，
     * 为了避免意外覆盖其他项目所存储的同名变量
     */
    protected namespaces: string;
    /**
     * Storage 的对象构造器
     * @param name 存储对象的名称
     * @param type 本地存储的类型，默认为 localStorage
     * @param prefix 存储对象的名称，用于生成命名空间，默认为 Lamp
     */
    constructor(name: string, type?: storageType, prefix?: string);
    /**
     * 初始化函数
     * 主要用于判断本地存储是否存在同名的非对象属性
     */
    private init;
    /**
     * 将修改内容存储到本地
     * @param store 修改后的对象
     */
    protected save(store: Store): void;
    /**
     * 存储对象
     * 自动获取存储对象
     */
    get store(): Store;
}
export default Storage;
