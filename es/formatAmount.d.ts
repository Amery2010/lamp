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
declare function formatAmount(value: number | string): string;
export default formatAmount;
