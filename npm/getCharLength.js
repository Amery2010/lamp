'use strict';

/**
 * 获取字符串的真实字符长度，汉字 2个字符，英文、数字一个字符
 * @param str 需要统计真实长度的字符串
 * @returns 返回真实字符长度
 * @example
 * ```
 * getCharLength('12331') => 5
 * getCharLength('abc') => 3
 * getCharLength('abc123') => 6
 * getCharLength('中文') => 4
 * getCharLength('中文English') => 11
 * getCharLength('中文2019Jliguala') => 16
 * ```
 * @author Amery
 * @version v0.2.0
 * @since v0.2.0
 */
function getCharLength(str) {
    var len = str.length;
    var realLength = 0;
    var charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        realLength += charCode >= 0 && charCode <= 128 ? 1 : 2;
    }
    return realLength;
}

module.exports = getCharLength;
