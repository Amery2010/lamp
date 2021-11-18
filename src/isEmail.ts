/**
 * Email 判断正则
 */
const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/**
 * 判断 Email 地址是否合法
 * @param str Email 地址
 * @returns 返回 boolean
 * @example
 * ```
 * isEmail('abc.def@qq.com') => true
 * isEmail('abc@def') => false
 * ```
 * @author Amery
 * @version v0.2.0
 * @since v0.2.0
 */
function isEmail (str: string): boolean {
  return regEmail.test(str)
}

export default isEmail
