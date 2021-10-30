'use strict';

/**
 * 生成随机长度的字符串
 * @param length 字符串长度
 * @returns 指定长度的随机字符串
 * @example
 * ```
 * genRandomString(16) => 5
 * ```
 * @author Amery
 * @version v0.4.0
 * @since v0.4.0
 */
function genRandomString(length) {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

module.exports = genRandomString;
