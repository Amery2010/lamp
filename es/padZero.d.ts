/**
 * 字符串补零
 * @param num 要格式化的数值
 * @param len 补零后的文本长度，默认为 2
 * @returns 返回格式化后的时间文本
 * @example
 * ```
 * padZero(2) => "02"
 * padZero(245, 6) => "000245"
 * padZero('7') => "07"
 * ```
 * @author Amery
 * @version v0.2.0
 * @since v0.1.0
 */
declare function padZero(num: number | string, len?: number): string;
export default padZero;
