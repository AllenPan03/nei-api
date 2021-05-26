// 当前执行node命令时候的文件夹地址
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
    // 项目的唯一标识 Key，在项目的设置中查看
    PROJECT_KEY: 'xxxx'
}