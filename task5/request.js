const http = require('http');
const reqLengthOrigin = process.argv[2];
const typeRequest = process.argv[3];
const startTime = new Date().getTime();

function request(reqLength, typeRequest) {
    if(reqLength) {
        const options = {
            hostname: '127.0.0.1',
            port: 8001,
            path: `/?request=${reqLengthOrigin - (reqLength - 1)}`
        };
        const req = http.get(options, res => {
            res.on('data', data => {
                console.log(data.toString(), 'Time:', new Date().getTime() - startTime);
                if (typeRequest === 'pos') {
                    request(--reqLength, typeRequest);
                }
            });
        });

        req.on('error', error => {
            console.error(error);
        });

        req.end();
        if (typeRequest === 'prl') {
            request(--reqLength, typeRequest);
        }
    }
}

request(reqLengthOrigin, typeRequest);
