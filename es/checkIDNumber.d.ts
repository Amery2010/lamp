/**
 * 校验 18 位身份证号码是否符合标准
 * 可以通过 province 参数进行省份限定，用于处理特定情况下的身份证号码要求
 * 该函数根据 GB11643-1999 标准编写，暂不支持校验香港、澳门和国外的身份证号码格式
 * [参考](https://juejin.im/post/5aa8d89af265da23866f9669)
 * @param idNum 身份证号码
 * @param province 省份筛选值，可以为省份名称或编号
 * @returns 身份证号码是否符合标准
 * @example
 * ```
 * checkIDNumber('11010519491231002X') => true // 常规用法
 * checkIDNumber('11010519491231002X', '北京') => true // 带省份筛选的用法
 * checkIDNumber('110105194912310021') => false // 校验码错误
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
declare function checkIDNumber(idNum: string, province?: string): boolean;
export default checkIDNumber;
