/**
 * UrlParams 接口定义
 * @interface UrlParams
 */
interface UrlParams {
    [propName: string]: string;
}
/**
 * 解析 url search 参数
 * @param query 查询参数字符串
 * @returns url 参数对象
 * @example
 * ```
 * queryString('?aid=test') => { aid: "test" }
 * queryString('?aid=test&lottery_type=wheel') => { aid: "test", lottery_type: "wheel" }
 * queryString('aid=test') => { aid: "test" }
 * queryString('name=%E4%B8%AD%E6%96%87%E6%B5%8B%E8%AF%95') => { name: "中文测试" }
 * queryString('plus=a%2Bb%2Bc') => { plus: "a+b+c" }
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
declare function queryString(query: string): UrlParams;
export default queryString;
