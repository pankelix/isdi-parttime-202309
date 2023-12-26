const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });

    res.end('<html><head><title>not found</title></head><body><h1>The page you are looking for is not found!</h1></body></html>');
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
// < HTTP/1.1 404 Not Found
// < Content-Type: text/html
// < Date: Wed, 13 Dec 2023 10:34:22 GMT
// < Connection: keep-alive
// < Keep-Alive: timeout=5
// < Transfer-Encoding: chunked
// <
// <html><head><title>not found</title></head><body><h1>The page you are looking for is not found!</h1></body></html>* Connection #0 to host 127.0.0.1 left intact