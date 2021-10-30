/**
 * 安卓设备判断正则
 */
var regAndroid = /(Android|Adr)/i;
/**
 * 判断是否为安卓设备
 * @returns 返回 boolean
 * @example
 * ```
 * isAndroid() => false
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
function isAndroid() {
    return regAndroid.test(navigator.userAgent);
}
export default isAndroid;
