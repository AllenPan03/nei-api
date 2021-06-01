
nei-api
===========================================
基于NEI自动化生成 API 模拟数据和接口 SDK。只需一行命令，快速生成前端所需要的接口文件和mock数据！

安装
-------------------------------
```
$ npm install nei-api -g
```

用法
-------------------------------
同时生成接口文件和mock数据：
```js
$ nei-api all
```
只生成api接口：
```js
$ nei-api api
```
只生成mock数据：
```js
$ nei-api mock
```

配置
-------------------------------
在项目的主目录下新建nei.config.js文件，配置内容如下
```js
const cwdPath = process.cwd();
module.exports = {
    // 获取json文件的方式 1-本地获取 2-http获取
    TYPE: 1,
    // api.json文件本地路径
    API_FILE_PATH: `${cwdPath}/api.json`,
    // api 生成路径
    API_DIR_PATH: `${cwdPath}/src/services/`,
    // mock 生成路径
    MOCK_DIR_PATH: `${cwdPath}/mock/`,
    // api模板路径
    TPL_API_PATH: `${cwdPath}/tpl/@api/module.js`,
    // 自定义request本地路径
    REQUEST_PATH: '@/utils/request/request',
    // NEI数据源服务器
    NEI_SERVER: 'https://nei.netease.com',
    // NEI项目ID
    NEI_PID: 123,
    // NEI访问令牌
    PRIVATE_TOKEN: 'xxxx',
    // 项目组的唯一标识 Key，在项目组的设置中查看
    PROGROUP_KEY: 'xxxx'
}
```
### 配置参数说明

| 名称 | 类型 | 是否必需 | 说明 |
| :--- | :--- | :--- | :--- |
| TYPE | Int | 是 | 获取json文件的方式 1-本地获取 2-http获 |
| PRIVATE_TOKEN | String | 是 | NEI访问令牌 |
| PROGROUP_KEY | String | 是 | 项目的唯一标识 Key，在项目的设置中查看 |
| REQUEST_PATH | String | 是 | 自定义request本地路径 |
| NEI_PID | String | 是 | NEI项目ID |
| API_FILE_PATH | String | 否 | api.json文件本地路径 |
| API_DIR_PATH | String | 否 | api 生成路径 |
| MOCK_DIR_PATH | Int | 否 | mock 生成路径 |
| TPL_API_PATH | String | 否 | api模板路径 |
| NEI_SERVER | Int | 否 | NEI数据源服务器 |

