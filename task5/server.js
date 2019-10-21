const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    setTimeout(() => {
        const queryData = url.parse(request.url, true).query;
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end(`Request#${queryData.request}`);
    }, 100);
}).listen(8001);
