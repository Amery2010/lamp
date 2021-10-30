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
function getFileExtension (filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export default getFileExtension
