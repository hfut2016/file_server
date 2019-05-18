
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

const host = {
    name: '0.0.0.0',
    port: 10086,
};
const filetype = {
    '.png': '',
    '.jpg': '',
    '.ico': '',
};
http.createServer(function (request, response) {

    console.log(`${request.headers.host}=>${request.url}`);
    const URL = url.parse(request.url);
    // console.log(URL.query);
    // console.log(path.extname(URL.pathname) in filetype);
    if (path.extname(URL.pathname) in filetype) {
        try {
            var data = '{"message":"server error!"}';
            // eslint-disable-next-line quotes
            data = fs.readFileSync(`./src/static/${URL.pathname}`);
            response.writeHead(200, {'Content-Type': 'image/jpeg'});
        } catch (e) {
            console.log(e);
            response.writeHead(404, {'Content-Type': 'application/json'});
        } finally {
            response.end(data);
        }

    } else {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end('{"message":"server error!"}');
    }
    // var data = fs.readFileSync('./src/static/1.jpg');
    // 发送响应数据 "Hello World"
    // response.write(JSON.stringify(request.headers));
    // response.end(data);
}).listen(host.port, host.name);

// 终端打印如下信息
console.log(`Server running at http://${host.name}:${host.port}`);
