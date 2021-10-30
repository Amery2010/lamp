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
export default isSupportWebp;
