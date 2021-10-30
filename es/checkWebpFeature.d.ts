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
declare function checkWebpFeature(feature: 'lossy' | 'lossless' | 'alpha' | 'animation'): Promise<boolean>;
export default checkWebpFeature;
