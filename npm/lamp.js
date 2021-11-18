'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * 浏览器存储类
 * @interface IStorage
 * @example
 * ```
 * new Storage('local', 'sessionStorage') // 使用 sessionStorage 存储
 * new Storage('local', 'localStorage', 'TestJLGL') // 替换默认的存储前缀
 * ```
 * @author Amery
 * @version v0.1.1
 * @since v0.1.0
 */
var Storage = /** @class */ (function () {
    /**
     * Storage 的对象构造器
     * @param name 存储对象的名称
     * @param type 本地存储的类型，默认为 localStorage
     * @param prefix 存储对象的名称，用于生成命名空间，默认为 Lamp
     */
    function Storage(name, type, prefix) {
        if (type === void 0) { type = 'localStorage'; }
        if (prefix === void 0) { prefix = 'Lamp'; }
        this.type = type;
        // 存储对象的命名空间
        this.namespaces = prefix + "_" + name;
        // 执行初始化函数
        this.init();
    }
    /**
     * 初始化函数
     * 主要用于判断本地存储是否存在同名的非对象属性
     */
    Storage.prototype.init = function () {
        if (this.type !== 'localStorage' && this.type !== 'sessionStorage') {
            throw new Error('目前仅支持 localStorage 和 sessionStorage 两种类型');
        }
        var localstore = window[this.type].getItem(this.namespaces);
        if (localstore !== null) {
            var store = JSON.parse(localstore);
            if (typeof store !== 'object') {
                console.warn(this.type + " \u4E0A\u5DF2\u7ECF\u5B58\u5728\u540D\u4E3A " + this.namespaces + " \u7684\u5C5E\u6027\uFF0C\u4F46\u8BE5\u5C5E\u6027\u4E0D\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF01");
            }
        }
        else {
            this.save(Object.create(null));
        }
    };
    /**
     * 将修改内容存储到本地
     * @param store 修改后的对象
     */
    Storage.prototype.save = function (store) {
        window[this.type].setItem(this.namespaces, JSON.stringify(store));
    };
    Object.defineProperty(Storage.prototype, "store", {
        /**
         * 存储对象
         * 自动获取存储对象
         */
        get: function () {
            var localstore = window[this.type].getItem(this.namespaces);
            if (localstore === null) {
                console.error(this.type + " \u4E0A\u7684 " + this.namespaces + " \u7684\u5C5E\u6027\u88AB\u610F\u5916\u6E05\u7406\uFF01");
                return Object.create(null);
            }
            return JSON.parse(localstore);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置属性
     * @param key 属性名
     * @param val 属性值
     */
    Storage.prototype.set = function (key, val) {
        var store = __assign({}, this.store);
        store[key] = val;
        this.save(store);
    };
    /**
     * 获取属性
     * @param key 属性名
     */
    Storage.prototype.get = function (key) {
        if (!(key in this.store))
            return null;
        return this.store[key];
    };
    /**
     * 移除属性
     * @param key 属性名
     */
    Storage.prototype.remove = function (key) {
        var store = __assign({}, this.store);
        if (key in store)
            delete store[key];
        this.save(store);
    };
    /**
     * 清理存储对象
     */
    Storage.prototype.clear = function () {
        this.save(Object.create(null));
    };
    return Storage;
}());

/**
 * 校验省份数字编号的正则
 */
var regProvince = /^[1-9][0-9]$/;
/**
 * 校验生日日期的正则
 */
var regBirthday = /^((18|19|20)\d{2})(\d{2})(\d{2})$/;
/**
 * 校验 18 位身份证的正则
 */
var regIDNumber = /^[1-9]\d{5}(18|19|20)\d{9}[0-9Xx]$/;
/**
 * 各省份的数字编号表
 */
var provinceNumber = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江',
    31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南',
    44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃',
    63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' };
/**
 * 校验省份编号是否符合规范
 * @param num 省份的编号
 * @returns 是否为现有的省份编号
 */
function checkProvince(num) {
    return regProvince.test(num) && typeof provinceNumber[num] === 'string';
}
/**
 * 校验生日日期是否符合规范
 * @param date 生日日期字符串
 * @returns 生日日期是否符合规范
 */
function checkBirthday(date) {
    if (regBirthday.test(date)) {
        // 将生日字符串替换为可以被 Date 格式化的日期形式
        var birthday = date.replace(regBirthday, '$1-$3-$4');
        // 将日期转换为 ISO 格式，如 2019-10-11T00:00:00.000Z
        try {
            var ISODate = new Date(birthday).toISOString();
            return ISODate.split('T')[0] === birthday;
        }
        catch (err) {
            console.warn(err.message);
            return false;
        }
    }
    return false;
}
/**
 * 检查校验码是否正确
 * @param idNum 身份证号码
 * @returns 校验码是否正确
 */
function checkCode(idNum) {
    // 加权因子表
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // X与校验码换算表
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    if (regIDNumber.test(idNum)) {
        var sum = 0;
        for (var i = 0; i < 17; i++) {
            sum += Number(idNum[i]) * factor[i];
        }
        return parity[sum % 11].toString() === idNum.substring(17).toUpperCase();
    }
    return false;
}
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
function checkIDNumber(idNum, province) {
    var provinceStr = idNum.substring(0, 2);
    var birthdayStr = idNum.substring(6, 14);
    if (province) {
        // 如果传入了省份限定值，则优先校验省份
        var provinceId = '';
        // 遍历获取省份名称对应的编号
        for (var idx in provinceNumber) {
            if (provinceNumber[idx] === province)
                provinceId = idx;
        }
        if (provinceId !== provinceStr) {
            console.warn('该身份证号码不属于该省份的用户！');
            return false;
        }
    }
    if (!checkProvince(provinceStr)) {
        console.warn('不存在于现有的省份范围内！');
        return false;
    }
    if (!checkBirthday(birthdayStr)) {
        console.warn('生日日期不符合规范！');
        return false;
    }
    if (!checkCode(idNum)) {
        console.warn('校验码不符合规范！');
        return false;
    }
    return true;
}

/**
 * 判断浏览器是否支持特定的 Webp 特性
 * @description 仅限于浏览器端使用，可以检查 lossy、lossless、alpha 和 animation 类型的 webp 文件支持度
 * @returns 返回 boolean
 * @example
 * ```
 * await checkWebpFeature('lossy') => true
 * await checkWebpFeature('animation') => false
 * ```
 * @author Amery
 * @version v0.5.0
 * @since v0.5.0
 */
function checkWebpFeature(feature) {
    var kTestImages = {
        lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
        lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
        alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
        animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
    };
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () { return resolve((img.width > 0) && (img.height > 0)); };
        img.onerror = function () { return reject(false); };
        img.src = "data:image/webp;base64," + kTestImages[feature];
    });
}

/**
 * 比较项目版本号
 * 1，比之前版本高；0，与之前版本一致；-1，比之前本部低。
 * @param ver1 当前的版本号
 * @param ver2 之前的版本号
 * @returns 返回版本比较状态
 * @example
 * ```
 * compareVersion('1.0.2', '1.0.1') => 1
 * compareVersion('0.3.1', '1.2.1') => -1
 * compareVersion('2.12', '2.12.0') => 0
 * ```
 * @author Amery
 * @version v0.3.0
 * @since v0.3.0
 */
function compareVersion(ver1, ver2) {
    var v1 = ver1.split('.');
    var v2 = ver2.split('.');
    var length = Math.max(v1.length, v2.length);
    for (var i = 0; i < length; i++) {
        var num1 = parseInt(v1[i]);
        var num2 = parseInt(v2[i]);
        if (num1 > num2)
            return 1;
        if (num1 < num2)
            return -1;
    }
    return 0;
}

/**
 * 将 url 参数对象生成对应的 url 链接参数
 * @param params url 参数对象，如 ['a=1', 'b=2']
 * @returns 返回 url query 字符串，如 ‘a=1&b=2’
 * @example
 * ```
 * createQueryString({ abc: 123 }) => "abc=123" // 常规用法
 * createQueryString({ abc: 123, def: 'text' }) => "abc=123&def=text" // 常规多变量用法
 * createQueryString({ zh: '中文' }) => "zh=%E4%B8%AD%E6%96%87" // 带中文字符的链接字符串用法
 * ```
 * @author Amery
 * @version v0.1.0
 * @since v0.1.0
 */
function createQueryString(params) {
    // 将 params 对象的参数和值使用 = 连接，并生成类似于 ['a=1', 'b=2'] 的数组
    var paramsArr = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    });
    return paramsArr.join('&');
}

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
function formatAmount(value) {
    var amount = typeof value === 'string' ? parseInt(value) : value;
    var integer = Math.floor(amount / 100);
    var decimal = amount - integer * 100;
    return integer.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',') + "." + (decimal >= 10 ? decimal : '0' + decimal);
}

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
function padZero(num, len) {
    if (len === void 0) { len = 2; }
    var str = num.toString();
    var rl = len - str.length;
    var rs = '';
    while (rl > 0) {
        rs += 0;
        rl--;
    }
    return rs + str;
}

/**
 * UTC 时间格式正则
 */
var regUTC = /^UTC$/i;
/**
 * 时间格式化正则
 */
var regFormat = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[Ll]|'[^']*'|'[^']*'/g;
/**
 * 本地化函数。目前只支持中文
 */
var locale = {
    weekdays: '星期日 星期一 星期二 星期三 星期四 星期五 星期六'.split(' '),
    weekdaysShort: '周日 周一 周二 周三 周四 周五 周六'.split(' '),
    months: '一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月'.split(' '),
    monthsShort: '1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月'.split(' ')
};
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
function formatDate(date, mask, type) {
    if (date === void 0) { date = new Date(); }
    if (mask === void 0) { mask = 'yyyy-mm-dd HH:MM:ss'; }
    if (type === void 0) { type = 'GMT'; }
    // 如果是不是标准的时间对象，则将其转换为时间对象
    /*
    *@fix 在ios上存在兼容问题 new Date('2020-12-12')输出为Invalid Date，需要将符号‘-’转换为符号‘/’
    */
    if (!(date instanceof Date)) {
        date = typeof date === 'number' && !isNaN(date) ? new Date(date) : new Date(date.toString().replace(/-/g, '/'));
    }
    // 判断是否为 UTC 时间
    var isUTC = regUTC.test(type);
    var d = isUTC ? date.getUTCDate() : date.getDate();
    var D = isUTC ? date.getUTCDay() : date.getDay();
    var m = isUTC ? date.getUTCMonth() : date.getMonth();
    var y = isUTC ? date.getUTCFullYear() : date.getFullYear();
    var H = isUTC ? date.getUTCHours() : date.getHours();
    var M = isUTC ? date.getUTCMinutes() : date.getMinutes();
    var s = isUTC ? date.getUTCSeconds() : date.getSeconds();
    var L = isUTC ? date.getUTCMilliseconds() : date.getMilliseconds();
    var flags = {
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
    };
    return mask.replace(regFormat, function (match) {
        return match in flags ? flags[match].toString() : match.slice(1, match.length - 1);
    });
}

/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param size 文件大小
 * @param pointLength 精确到的小数点数。
 * @param units 从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了 KB(千字节)，同时文件大小大于 MB, 此方法的输出将还是显示成多少 KB。
 * @returns 格式化后的文件大小
 * @example
 */
function formatSize(size, pointLength, units) {
    if (pointLength === void 0) { pointLength = 2; }
    if (typeof size === 'undefined')
        return '0';
    if (typeof units === 'undefined')
        units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var unit;
    while ((unit = units.shift()) && size >= 1024)
        size = size / 1024;
    return (unit === units[0] ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit;
}

/**
 * 生成随机长度的字符串
 * @param length 字符串长度
 * @returns 指定长度的随机字符串
 * @example
 * ```
 * genRandomString(16) => 5
 * ```
 * @author Amery
 * @version v0.4.0
 * @since v0.4.0
 */
function genRandomString(length) {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/**
 * 获取字符串的真实字符长度，汉字 2个字符，英文、数字一个字符
 * @param str 需要统计真实长度的字符串
 * @returns 返回真实字符长度
 * @example
 * ```
 * getCharLength('12331') => 5
 * getCharLength('abc') => 3
 * getCharLength('abc123') => 6
 * getCharLength('中文') => 4
 * getCharLength('中文English') => 11
 * getCharLength('中文2019Jliguala') => 16
 * ```
 * @author Amery
 * @version v0.2.0
 * @since v0.2.0
 */
function getCharLength(str) {
    var len = str.length;
    var realLength = 0;
    var charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        realLength += charCode >= 0 && charCode <= 128 ? 1 : 2;
    }
    return realLength;
}

/**
 * 获取文件扩展名
 * @description 获取文件扩展名，兼容边缘情况。
 * @param filename 文件名
 * @returns 返回文件拓展名
 * @example
 * ```
 * getFileExtension('filename') => ''
 * getFileExtension('filename.txt') => 'txt'
 * getFileExtension('.hiddenfile') => ''
 * getFileExtension('filename.with.many.dots.ext') => 'ext'
 * getFileExtension('中文文件名.txt') => 'txt'
 * ```
 * @author Amery
 * @version v0.6.0
 * @since v0.6.0
 */
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

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

/**
 * Email 判断正则
 */
var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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
function isEmail(str) {
    return regEmail.test(str);
}

/**
 * IOS 设备判断正则
 */
var regIOS = /\(i[^;]+;( U;)? CPU.+Mac OS X/i;
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
function isIOS() {
    return regIOS.test(navigator.userAgent);
}

/**
 * 判断浏览器是否支持 Webp
 * @description 仅限于浏览器端使用
 * @returns 返回 boolean
 * @example
 * ```
 * isSupportWebp() => true
 * ```
 * @author Amery
 * @version v0.5.0
 * @since v0.5.0
 */
function isSupportWebp() {
    try {
        return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
    }
    catch (err) {
        return false;
    }
}

/**
 * url 参数形式的匹配正则
 */
var search = /([^&=]+)=?([^&]*)/g;
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
function queryString(query) {
    var match;
    if (query[0] === '?')
        query = query.substring(1);
    var urlParams = {};
    while ((match = search.exec(query)) !== null) {
        urlParams[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    }
    return urlParams;
}

/**
 * 使用洗牌算法对数组随机排序
 * @see https://github.com/ccforward/cc/issues/44
 * @param arr 需要随机排序的数组
 * @returns 随机排序后的数组
 * @example
 * ```
 * shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) => [ 9, 7, 6, 0, 4, 2, 3, 8, 5, 1 ]
 * shuffle(['a', 'b', 'c', 'd', 'e', 'f']) => [ 'a', 'f', 'e', 'b', 'd', 'c' ]
 * shuffle([0, '1', 'a', { B: 'b'}, ['c', 'd'], 5]) => [ 'a', { B: 'b' }, [ 'c', 'd' ], 5, '1', 0 ]
 * ```
 * @author Amery
 * @version v0.3.0
 * @since v0.3.0
 */
function shuffle(arr) {
    var _a;
    var n = arr.length, random;
    while (0 !== n) {
        // 无符号右移位运算符向下取整
        random = (Math.random() * n--) >>> 0;
        // ES6 的解构赋值实现变量互换
        _a = [arr[random], arr[n]], arr[n] = _a[0], arr[random] = _a[1];
    }
    return arr;
}

/**
 * 随机数数组
 */
var rnds = new Array(16);
/**
 * 利用 Math.random 函数的随机数生成器
 * 生成的随机数的质量相对较低，但由于浏览器无法使用 Node.js 中的 Crypto 模块，
 * 此为不得已而为之的替代做法
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/rng-browser.js
 * @returns 随机数数组
 */
function mathRNG() {
    for (var i = 0, r = 0; i < 16; i++) {
        if ((i & 0x03) === 0)
            r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }
    return rnds;
}
/**
 * 字节转十六进制字符串的映射
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
    // 将字节值转为十六进制字符串
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
}
/**
 * 将字节数组转为对应的 UUID 字符串
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 * @param buf 字节数组
 * @param offset 数组偏移量
 * @returns uuid 字符串
 */
function bytesToUuid(buf, offset) {
    if (offset === void 0) { offset = 0; }
    var i = offset;
    var bth = byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return ([
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]]
    ]).join('');
}
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
function uuid() {
    var rnds = mathRNG();
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    return bytesToUuid(rnds);
}

var VERSION = '0.6.1';

exports.Storage = Storage;
exports.VERSION = VERSION;
exports.checkIDNumber = checkIDNumber;
exports.checkWebpFeature = checkWebpFeature;
exports.compareVersion = compareVersion;
exports.createQueryString = createQueryString;
exports.formatAmount = formatAmount;
exports.formatDate = formatDate;
exports.formatSize = formatSize;
exports.genRandomString = genRandomString;
exports.getCharLength = getCharLength;
exports.getFileExtension = getFileExtension;
exports.isAndroid = isAndroid;
exports.isEmail = isEmail;
exports.isIOS = isIOS;
exports.isSupportWebp = isSupportWebp;
exports.padZero = padZero;
exports.queryString = queryString;
exports.shuffle = shuffle;
exports.uuid = uuid;
