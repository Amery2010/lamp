/**
 * 时间格式化函数
 * 从 v0.2.0 将 dateFormat 改为 formatDate
 * ```
 * ----------
 * d:    以数字表示某天，前置无 0
 * dd:   以数字表示某天，前置补 0
 * ddd:  周几，星期几的缩写
 * dddd: 星期几
 * m:    以数字表示的月份，前置无 0
 * mm:   以数字表示的月份，前置补 0
 * mmm:  数字加月份的组合，几月份的简写形式，如，3月
 * mmmm: 几月份，如，三月
 * yy:   年份为最后两位数
 * yyyy: 完整的四位数年份
 * h:    小时（12小时制），前置无 0
 * hh:   小时（12小时制），前置补 0
 * H:    小时（24小时制），前置无 0
 * HH:   小时（24小时制），前置补 0
 * M:    分钟，前置无 0
 * MM:   分钟，前置补 0
 * s:    秒，前置无 0
 * ss:   秒，前置补 0
 * l:    毫秒，3位值
 * L:    毫秒，2位值
 * t:    小写的两字符时间标记字符串，am 或 pm
 * tt:   大写的两字符时间标记字符串，AM 或 PM
 * TT:   中文的时间标记文本，上午或下午
 * ----------
 * ```
 * @param date 时间值，任何传入的值都会被尝试转换为 Date 值
 * @param mask 时间格式化字符串
 * @param type 时间格式类型，默认为 GMT
 * @returns 格式化后的时间文本
 * @example
 * ```
 * formatDate(1569464365129) => "2019-09-26 10:19:25"
 * formatDate(1569464365129, 'yyyy-mm-dd') => "2019-09-26"
 * formatDate(1569464365129, 'HH:MM:ss.L') => "10:19:25.13"
 * formatDate(1569464365129, 'm/d/yy') => "9/26/19"
 * formatDate(1569464365129, 'yyyy年m月dd日') => "2019年9月26日"
 * formatDate(1569488486249, 'ddd TTh:MM') => "周四 下午5:01"
 * ```
 * @author Amery
 * @version v0.2.0
 * @since v0.1.0
 */
declare function formatDate(date?: Date | string | number, mask?: string, type?: string): string;
export default formatDate;
