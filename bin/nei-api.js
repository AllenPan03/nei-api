#!/usr/bin/env node
const util = require("../lib/util");
let mock, api;
if (util.isExists(false)) {
    mock = require("../lib/mock")
    api = require("../lib/api")
}
const program = require('commander')
const pkg = require("../package.json")

program.version(pkg.version, '-v, --version', '版本号')
program
    .command('all')
    .description('同时生成api文件以及mock数据')
    .action(function () {
        if (util.isExists(true)) {
            api.getApiJson()
            mock.getMock()
        }
    });
program
    .command('mock')
    .description('生成mock文件')
    .action(function () {
        if (util.isExists(true)) {
            mock.getMock()
        }
    });
program
    .command('api')
    .description('生成api文件')
    .action(function () {
        if (util.isExists(true)) {
            api.getApiJson()
        }
    });

program.parse(process.argv)
