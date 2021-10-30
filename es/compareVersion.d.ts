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
declare function compareVersion(ver1: string, ver2: string): number;
export default compareVersion;
