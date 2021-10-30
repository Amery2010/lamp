'use strict';

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

module.exports = checkIDNumber;
