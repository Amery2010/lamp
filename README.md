# lamp

一个工具函数合集，包含一些项目中常用的处理逻辑函数
这不是阿拉丁的神灯，但也可以满足你的许多需求...哦，我可以先许个愿望么？

> 该工具库设计的初衷是为了弥补 [lodash](https://lodash.com/) 这个工具库的不足。lodash 支持的函数非常丰富，囊括了绝大部分常规函数，但 lodash 并不是一个万能的库，他不包含任何与业务逻辑或者浏览器特性相关的函数，因此诞生了 lamp 这个库。lamp 主要是一些常用的工具函数，比如 isEmail、compareVersion，也有 uuid、queryString、formatDate 等常用库的简易实现版本。lamp 库里的每一个函数我都尽可能的独立，不引入任何外部依赖，且函数间也很少有相互依赖关系。lamp 工具库吸收了部分 linux 的设计哲学，绝大部分函数都是纯函数，且一个函数只做一件事。该工具库默认是 esm 的形式，支持单文件引入和 Tree Shiking，所以在实际开发过程中，lamp 库可以有效和打包工具协作，只导入你需要的函数，因此在实际开发过程中，占用体积极小，你可以放心的引入。

## 项目导出格式

目前项目直接生成 es 和 npm 格式的文件，语法以 es5 为基础：

- es：使用 import 以及 export 进行引用和导出
- npm：使用 module.exports 进行导出

## 通过脚本自动生成 lamp 文件

`node ./bin/createMainFile.js` 用于动态生成 lamp.ts 文件，此脚本可以大量节省用户追加新增函数时间以及更新版本号的操作。并让一次性导入全部函数成为可能。

## 函数列表

|       函数名       |       函数作用       |
| ----------------- | ------------------- |
| lamp              | 工具函数集合          |
| checkIDNumber     | 校验身份证号码        |
| compareVersion    | 比较版本号大小        |
| queryString       | 解析 url 参数        |
| createQueryString | 创建 url querystring，一般配合 queryString 函数使用 |
| formatAmount      | 简单的格式化金额      |
| formatDate        | 简单的格式化时间      |
| formatSize        | 格式化文件大小        |
| genRandomString   | 获取指定长度的随机字符串 |
| getCharLength     | 获取字符长度（非字符串长度）|
| isAndroid         | 判断是否为安卓设备     |
| isIOS             | 判断是否为 iOS 设备   |
| isEmail           | 判断是否为有效的邮箱地址 |
| padZero           | 字符串补零           |
| shuffle           | 使用洗牌算法对数组随机排序 |
| Storage           | 浏览器存储类         |
| uuid              | 生成符合 uuid v4 标准的字符串 |
