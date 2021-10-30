/**
 * 生成符合 uuid v4 标准的字符串
 * 该函数是从 [uuid](https://www.npmjs.com/package/uuid) 抽离出来的，
 * 采用 v4 标准的相关代码，但移除了其原有的参数支持，以减少函数体积。
 * @see https://github.com/kelektiv/node-uuid/blob/master/v4.js
 * @returns uuid 字符串
 * @example
 * ```
 * uuid() => "62ae035d-7d2a-4f2e-80ff-19f3f9ea85a1"
 * ```
 * @author Amery
 * @version v0.3.0
 * @since v0.3.0
 */
declare function uuid(): string;
export default uuid;
