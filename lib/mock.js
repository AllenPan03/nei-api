const fs = require("fs");
const rp = require("request-promise");
const path = require("path");
const util = require("./util");
const log = require("./log.js");
const apiConfig = require(path.resolve(process.cwd(), "./nei.config"));
const MOCK_DIR_PATH = apiConfig.MOCK_DIR_PATH || `${process.cwd()}/mock/`;
const { NEI_SERVER = "https://nei.netease.com" } = apiConfig;
let mock = {};
// mock列表索引
let mockIndex = 0;
// mock列表
let mockArr = [];

/**
 * 获取mock数据
 * @param {string} url 接口path地址
 * @param {string} method 接口请求方法
 * @returns
 */
mock.getMockData = async (url, method) => {
  const newUrl = `${NEI_SERVER}/api/apimock-v2/${apiConfig.PROGROUP_KEY}/${url}`;
  var options = {
    method,
    url: newUrl,
    timeout: 10000,
    json: true,
  };
  try {
    const mockData = await rp(options);
    return mockData;
  } catch (err) {
    log.error(`接口${url}请求失败：${err}`);
    // return {}
  }
};

/**
 * 生成mock接口
 * @param {String} dir 创建目录
 * @param {Object} data mock数据
 */
mock.build = (dir, data) => {
  if (fs.existsSync(dir)) {
    util.clean(dir);
  }
  mockArr = data;
  mock.buildOne(mockArr[mockIndex]);
};

/**
 * 生成指定的一个mock文件
 * @param {Object} data 指定的一个api数据
 */
mock.buildOne = async function (data) {
  let urlArr = util.cleanEmptyInArray(data.path.split("/"));
  const API_URL = `${urlArr.join("/")}`;
  let apiPath = MOCK_DIR_PATH;
  let API_NAME = urlArr[urlArr.length - 1];
  // 命名mock文件名称
  let mockFileName = `${(API_NAME && API_NAME.split("?")[0]) || "other"}.json`;
  for (let i = 0; i < urlArr.length - 1; i++) {
    let urlItem = urlArr[i].replace(/:/g, "");
    apiPath += `${urlItem}/`;
  }
  // 目标mock文件路径
  let targetMockFilePath = `${apiPath}${mockFileName}`;
  // 读取目标文件内容
  let mockData = await mock.getMockData(API_URL, data.method);
  if (!fs.existsSync(apiPath)) {
    util.mkdirSync(apiPath);
  }
  // 写入新内容
  try {
    log.info(targetMockFilePath);
    fs.writeFileSync(targetMockFilePath, JSON.stringify(mockData), "utf8");
    log.success(`mock ${API_NAME} 创建成功`);
    mock.buildNext();
  } catch (error) {
    log.error(`mock ${API_NAME} 创建失败，正在尝试重新创建...`);
    mock.buildOne(data);
  }
};
/**
 * 生成下一个api接口
 */
mock.buildNext = function () {
  mockIndex++;
  if (mockArr[mockIndex]) {
    mock.buildOne(mockArr[mockIndex]);
  } else {
    log.end(
      "=============================mock创建结束==============================="
    );
  }
};
/**
 * 获取Mock数据
 */
mock.getMock = async function () {
  const apiJson = await util.getApiData();
  if (apiJson) {
    mock.build(MOCK_DIR_PATH, apiJson, true);
  }
};

module.exports = mock;
