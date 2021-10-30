const fs = require('fs')
const path = require('path')
const version = require('../package.json').version

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param include 需要收集的文件类型
 */
function getFileList (filePath, includeExt) {
  const fileList = []
  // 根据文件路径读取文件，返回文件列表
  try {
    const files = fs.readdirSync(filePath)
    // 遍历读取到的文件列表
    files.forEach(filename => {
      // 只处理特定的文件类型
      if (path.extname(filename) !== includeExt) return false
      // 获取当前文件的绝对路径
      const filedir = path.join(filePath, filename)
      // 根据文件路径获取文件信息，返回一个 fs.Stats 对象
      try {
        const stats = fs.statSync(filedir)
        if (stats.isFile()) {
          fileList.push({
            name: path.basename(filedir, '.js'),
            path: filedir,
          })
        }
        if (stats.isDirectory()) {
          fileList.concat(getFileList(filedir)) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
      } catch (err) {
        console.warn(err)
      }
    })
  } catch (err) {
    console.warn(err)
  }
  return fileList
}

const fileList = getFileList('./es', '.js')

// 动态创建 lamp 函数
let mainFile = ''
const files = {}
fileList.forEach(file => {
  const name = file.name
  files[name] = file
  mainFile += name === 'lamp' ? `
export const VERSION = '${version}'
` : `
export { default as ${name} } from './${name}'
`
})

fs.writeFileSync('./src/lamp.ts', mainFile)
console.log('成功生成 lamp.ts 文件')
fs.writeFileSync('./files.json', JSON.stringify(files, null, 2))
console.log('成功生成 files.json 文件')

// 导出函数，该函数在 rollup.config.js 中也有使用
module.exports = {
  getFileList
}
