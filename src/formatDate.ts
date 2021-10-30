import padZero from './padZero'

/**
 * Locale 接口定义
 * @interface Locale
 */
interface Locale {
  [propName: string]: Array<string>;
}

/**
 * Flag 接口定义
 * @interface Flag
 */
interface Flag {
  [propName: string]: string | number;
}

/**
 * UTC 时间格式正则
 */
const regUTC = /^UTC$/i

/**
 * 时间格式化正则
 */
const regFormat = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[Ll]|'[^']*'|'[^']*'/g

/**
 * 本地化函数。目前只支持中文
 */
const locale: Locale = {
  weekdays: '星期日 星期一 星期二 星期三 星期四 星期五 星期六'.split(' '),
  weekdaysShort: '周日 周一 周二 周三 周四 周五 周六'.split(' '),
  months: '一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月'.split(' '),
  monthsShort: '1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月'.split(' ')
}

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
function formatDate (
  date: Date | string | number = new Date(),
  mask = 'yyyy-mm-dd HH:MM:ss',
  type = 'GMT'
): string {
  // 如果是不是标准的时间对象，则将其转换为时间对象
  /*
  *@fix 在ios上存在兼容问题 new Date('2020-12-12')输出为Invalid Date，需要将符号‘-’转换为符号‘/’
  */
  if (!(date instanceof Date)) {
    date = typeof date === 'number' && !isNaN(date) ? new Date(date) : new Date(date.toString().replace(/-/g, '/'))
  }
  // 判断是否为 UTC 时间
  const isUTC: boolean = regUTC.test(type)

  const d: number = isUTC ? date.getUTCDate() : date.getDate()
  const D: number = isUTC ? date.getUTCDay() : date.getDay()
  const m: number = isUTC ? date.getUTCMonth() : date.getMonth()
  const y: number = isUTC ? date.getUTCFullYear() : date.getFullYear()
  const H: number = isUTC ? date.getUTCHours() : date.getHours()
  const M: number = isUTC ? date.getUTCMinutes() : date.getMinutes()
  const s: number = isUTC ? date.getUTCSeconds() : date.getSeconds()
  const L: number = isUTC ? date.getUTCMilliseconds() : date.getMilliseconds()

  const flags: Flag = {
    d: d,
    dd: padZero(d),
    ddd: locale.weekdaysShort[D],
    dddd: locale.weekdays[D],
    m: m + 1,
    mm: padZero(m + 1),
    mmm: locale.monthsShort[m],
    mmmm: locale.months[m],
    yy: y.toString().substring(2),
    yyyy: y,
    h: H % 12 || 12,
    hh: padZero(H % 12 || 12),
    H: H,
    HH: padZero(H),
    M: M,
    MM: padZero(M),
    s: s,
    ss: padZero(s),
    l: padZero(L, 3),
    L: padZero(Math.round(L / 10)),
    t: H < 12 ? 'am' : 'pm',
    tt: H < 12 ? 'AM' : 'PM',
    TT: H < 12 ? '上午' : '下午'
  }
  return mask.replace(regFormat, (match: string): string => {
    return match in flags ? flags[match].toString() : match.slice(1, match.length - 1)
  })
}

export default formatDate
