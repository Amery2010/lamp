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
function checkWebpFeature (feature: 'lossy' | 'lossless' | 'alpha' | 'animation'): Promise<boolean> {
  const kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
  }
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = (): void => resolve((img.width > 0) && (img.height > 0))
    img.onerror = (): void => reject(false)
    img.src = `data:image/webp;base64,${kTestImages[feature]}`
  })
}

export default checkWebpFeature
