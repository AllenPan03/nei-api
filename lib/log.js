var chalk = require('chalk');

let log = {}

/**
 * 普通输出
 * @param {String} content 内容
 */
log.info = function (content) {
    console.log(`   ${content}`);
}

/**
 * 成功输出
 * @param {String} content 内容
 */
log.success = function (content) {
    console.log(chalk.green(`   ${content}`));
}

/**
 * 错误输出
 * @param {String} content 内容
 */
log.error = function (content) {
    console.log(chalk.red(content));
}

/**
 * 结果输出
 * @param {String} content 内容
 */
log.end = function (content) {
    console.log(chalk.hex('#FF7F00').bold(content));
}


module.exports = log;