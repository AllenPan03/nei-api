#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const log = require("./log.js");
if (fs.existsSync(path.resolve(process.cwd(), './nei.config.js'))) {
} else {
    log.error("请确认当前目录下是否已配置<nei.config.js>文件\n详见文档：https://github.com/AllenPan03/nei-api")
    return;
}
const { mock } = require("./mock")
const { api } = require("./api")
const program = require('commander')
const pkg = require("../package.json")

program.version(pkg.version, '-v, --version', '版本号')
program
    .command('all')
    .description('同时生成api文件以及mock数据')
    .action(function () {
        api.getApiJson()
        mock.getMock()
    });
program
    .command('mock')
    .description('生成mock文件')
    .action(function () {
        mock.getMock()
    });
program
    .command('api')
    .description('生成api文件')
    .action(function () {
        api.getApiJson()
    });

program.parse(process.argv)
