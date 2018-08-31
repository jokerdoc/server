/**
 * 静态服务器
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const chalk = require('chalk');

const app = express();
const path = require('path');
const rootPath = require('app-root-path').path;

const argv = require('yargs')
  .option('port', {
    alias: 'p',
    default: 8080
  })
  .argv;


// 接口代理
const proxyTable = require(path.resolve(rootPath, './proxy.config'));
for (let key in proxyTable) {
  app.use(proxy(key, proxyTable[ key ]));
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// 静态文件
app.use(express.static(rootPath + '/dist'));
// console.log(path.relative(__dirname, path.resolve(rootPath, argv.src)));


// 监听port端口
app.listen(argv.port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`> Listening at ` + chalk.blue(`http://localhost:${argv.port}`));
});