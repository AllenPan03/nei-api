const { mock } = require("./mock")
const { api } = require("./api")
const program = require('commander')
const pkg = require("../package.json")
api.getApiJson()
mock.getMock()


program
    // 版本号
    .version(pkg.version)
    .option('-v', '版本号', function () {
        console.log(pkg.version)
    });

program.on('--api', api.getApiJson());
program.on('--mock', mock.getMock());

program.parse(process.argv)
