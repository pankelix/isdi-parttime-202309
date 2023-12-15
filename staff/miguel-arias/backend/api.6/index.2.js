const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end('<html><head><title>hola mundo</title></head><body><h1>Hello World!</h1></body></html>');
});

server.listen(8000)

// * processing: http://127.0.0.1:8000
// *   Trying 127.0.0.1:8000...
// * Connected to 127.0.0.1 (127.0.0.1) port 8000
// > GET / HTTP/1.1
// > Host: 127.0.0.1:8000
// > User-Agent: curl/8.2.1
// > Accept: */*
// >
// < HTTP/1.1 200 OK
// < Content-Type: text/html
// < Date: Wed, 13 Dec 2023 10:31:57 GMT
// < Connection: keep-alive
// < Keep-Alive: timeout=5
// < Transfer-Encoding: chunked
// <
// <html><head><title>hola mundo</title></head><body><h1>Hello World!</h1></body></html>* Connection #0 to host 127.0.0.1 left intact