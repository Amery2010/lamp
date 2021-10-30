'use strict';

/**
 * 将 url 参数对象生成对应的 url 链接参数
 * @param params url 参数对象，如 ['a=1', 'b=2']
 * @returns 返回 url query 字符串，如 ‘a=1&b=2’
 * @example
 * ```
 * createQueryString({ abc: 123 }) => "abc=123" // 常规用法
 * createQueryString({ abc: 123, def: 'text' }) => "abc=123&def=text" // 常规多变量用法
 * createQueryString({ zh: '中文' }) => "zh=%E4%B8%AD%E6%96%87" // 带中文字符的链接字符串用法
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
function createQueryString(params) {
    // 将 params 对象的参数和值使用 = 连接，并生成类似于 ['a=1', 'b=2'] 的数组
    var paramsArr = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    });
    return paramsArr.join('&');
}

module.exports = createQueryString;
