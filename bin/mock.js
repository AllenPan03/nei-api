const fs = require('fs');
const rp = require('request-promise');
const path = require('path');
const { apiConfig } = require(path.resolve(process.cwd(), './nei.config'));
const util = require("./util");
const log = console.log;
let mock = {};
// mock列表索引
let mockIndex = 0;
// mock列表
let mockArr = [];

/**
 * 清除空mock
 */
mock.clean = function (dir) {
    util.rmdirSync(dir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};
/**
 * 获取mock数据
 * @param {string} url 接口path地址
 * @returns 
 */
mock.getMockData = async (url) => {
    const newUrl = `${apiConfig.NEI_SERVER}/api/apimock-v2/${apiConfig.PROJECT_KEY}/${url}`;
    var options = {
        method: 'POST',
        uri: newUrl,
        json: true
    };
    try {
        const mockData = await rp(options);
        return mockData;
    } catch (err) {
        log(`接口${url}请求失败：${err}`)
        return {}
    }
}

/**
 * 生成mock接口
 * @param {String} dir 创建目录
 * @param {Object} data mock数据
 */
mock.build = (dir, data) => {
    if (fs.existsSync(dir)) {
        mock.clean(dir);
    }
    mockArr = data.result;
    mock.buildOne(mockArr[mockIndex]);
};

/**
 * 生成指定的一个mock文件
 * @param {Object} data 指定的一个api数据
 */
mock.buildOne = async function (data) {
    let urlArr = util.cleanEmptyInArray(data.path.split('/'));
    const API_URL = `${urlArr.join('/')}`;
    let apiPath = apiConfig.MOCK_DIR_PATH;
    let API_NAME = urlArr[urlArr.length - 1];
    // 命名mock文件名称
    let mockFileName = `${urlArr[urlArr.length - 1] || 'other'}.json`;
    if (mockFileName === 'delete.json') {
        // delete不能作为函数方法名
        mockFileName = 'delete_1.json';
    }

    for (let i = 0; i < urlArr.length - 1; i++) {
        apiPath += `${urlArr[i]}/`;
    }
    // 目标mock文件路径
    let targetMockFilePath = `${apiPath}${mockFileName}`;

    // 读取目标文件内容
    let mockData = await mock.getMockData(API_URL);
    if (!fs.existsSync(apiPath)) {
        util.mkdirSync(apiPath)
    }
    // 写入新内容
    try {
        log(targetMockFilePath)
        fs.writeFileSync(targetMockFilePath, JSON.stringify(mockData), 'utf8');
        log(`mock ${API_NAME} 创建成功`);
    } catch (error) {
        log(`mock ${API_NAME} 创建失败，原因：${error}`);
    }
    mock.buildNext();
};
/**
 * 生成下一个api接口
 */
mock.buildNext = function () {
    mockIndex++;
    if (mockArr[mockIndex]) {
        mock.buildOne(mockArr[mockIndex]);
    } else {
        log('mock创建结束');
    }
};
/**
 * 获取Mock数据
 */
mock.getMock = async function () {
    const { TYPE, API_FILE_PATH, NEI_SERVER, NEI_PID, PRIVATE_TOKEN } = apiConfig;
    let apiJson = {}
    if (TYPE === 1) {
        if (fs.existsSync(API_FILE_PATH)) {
            apiJson = require(API_FILE_PATH);
        } else {
            log('api.json文件不存在');
        }
    }
    if (TYPE === 2) {
        var options = {
            method: 'GET',
            uri: `${NEI_SERVER}/openapi/interfaces?pid=${NEI_PID}&private_token=${PRIVATE_TOKEN}`,
            json: true
        };
        try {
            apiJson = await rp(options);
        } catch (err) {
            log(`接口请求失败：${err}`)
        }
    }
    mock.build(apiConfig.MOCK_DIR_PATH, apiJson, true);
}


module.exports.mock = mock;