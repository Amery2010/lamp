const resolve = require('rollup-plugin-node-resolve')
const path = require('path')
const files = require('./files.json')

const rootDir = path.resolve(__dirname)

const config = Object.keys(files).map(fileName => {
  const fileDir = files[fileName].path
  const name = path.basename(fileDir, '.js')
  return {
    input: fileDir,
    context: 'this',
    output: {
      name,
      dir: rootDir + '/npm',
      format: 'cjs' // 使用 commonjs 的格式导出，主要用于 npm 依赖的方式进行加载
    },
    plugins: [
      resolve()
    ],
  }
})

module.exports = config
