/**
 * IOS 设备判断正则
 */
const regIOS = /\(i[^;]+;( U;)? CPU.+Mac OS X/i

/**
 * 判断是否为 IOS 设备（iPhone、Ipad、Ipod等）
 * @returns 返回 boolean
 * @example
 * ```
 * isIOS() => true
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
function isIOS (): boolean {
  return regIOS.test(navigator.userAgent)
}

export default isIOS
