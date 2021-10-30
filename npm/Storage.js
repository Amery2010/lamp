'use strict';

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * 浏览器存储类
 * @interface IStorage
 * @example
 * ```
 * new Storage('local', 'sessionStorage') // 使用 sessionStorage 存储
 * new Storage('local', 'localStorage', 'TestJLGL') // 替换默认的存储前缀
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
var Storage = /** @class */ (function () {
    /**
     * Storage 的对象构造器
     * @param name 存储对象的名称
     * @param type 本地存储的类型，默认为 localStorage
     * @param prefix 存储对象的名称，用于生成命名空间，默认为 JLGL
     */
    function Storage(name, type, prefix) {
        if (type === void 0) { type = 'localStorage'; }
        if (prefix === void 0) { prefix = 'JLGL'; }
        this.type = type;
        // 存储对象的命名空间
        this.namespaces = prefix + "_" + name;
        // 执行初始化函数
        this.init();
    }
    /**
     * 初始化函数
     * 主要用于判断本地存储是否存在同名的非对象属性
     */
    Storage.prototype.init = function () {
        if (this.type !== 'localStorage' && this.type !== 'sessionStorage') {
            throw new Error('目前仅支持 localStorage 和 sessionStorage 两种类型');
        }
        var localstore = window[this.type].getItem(this.namespaces);
        if (localstore !== null) {
            var store = JSON.parse(localstore);
            if (typeof store !== 'object') {
                console.warn(this.type + " \u4E0A\u5DF2\u7ECF\u5B58\u5728\u540D\u4E3A " + this.namespaces + " \u7684\u5C5E\u6027\uFF0C\u4F46\u8BE5\u5C5E\u6027\u4E0D\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF01");
            }
        }
        else {
            this.save(Object.create(null));
        }
    };
    /**
     * 将修改内容存储到本地
     * @param store 修改后的对象
     */
    Storage.prototype.save = function (store) {
        window[this.type].setItem(this.namespaces, JSON.stringify(store));
    };
    Object.defineProperty(Storage.prototype, "store", {
        /**
         * 存储对象
         * 自动获取存储对象
         */
        get: function () {
            var localstore = window[this.type].getItem(this.namespaces);
            if (localstore === null) {
                console.error(this.type + " \u4E0A\u7684 " + this.namespaces + " \u7684\u5C5E\u6027\u88AB\u610F\u5916\u6E05\u7406\uFF01");
                return Object.create(null);
            }
            return JSON.parse(localstore);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置属性
     * @param key 属性名
     * @param val 属性值
     */
    Storage.prototype.set = function (key, val) {
        var store = __assign({}, this.store);
        store[key] = val;
        this.save(store);
    };
    /**
     * 获取属性
     * @param key 属性名
     */
    Storage.prototype.get = function (key) {
        if (!(key in this.store))
            return null;
        return this.store[key];
    };
    /**
     * 移除属性
     * @param key 属性名
     */
    Storage.prototype.remove = function (key) {
        var store = __assign({}, this.store);
        if (key in store)
            delete store[key];
        this.save(store);
    };
    /**
     * 清理存储对象
     */
    Storage.prototype.clear = function () {
        this.save(Object.create(null));
    };
    return Storage;
}());

module.exports = Storage;
