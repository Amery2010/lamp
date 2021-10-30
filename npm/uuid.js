'use strict';

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

module.exports = uuid;
