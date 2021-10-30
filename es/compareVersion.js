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
export default compareVersion;
