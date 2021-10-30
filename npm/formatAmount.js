'use strict';

/**
 * 格式化金额
 * @param value 需要格式化的金额数字
 * @returns 格式化后的金额文本
 * @example
 * ```
 * formatAmount(320020) => 3,200.20
 * formatAmount('203357') => 2,033.57
 * ```
 * @author Amery
 * @version v0.2.1
 * @since v0.2.0
 * ```
 * @fix v0.2.1修复 toLocaleString(en-US) 在微信浏览器上无输出，在uc以及qq浏览器上添加千分符失败
 */
function formatAmount(value) {
    var amount = typeof value === 'string' ? parseInt(value) : value;
    var integer = Math.floor(amount / 100);
    var decimal = amount - integer * 100;
    return integer.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',') + "." + (decimal >= 10 ? decimal : '0' + decimal);
}

module.exports = formatAmount;
