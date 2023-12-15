const http = require('http')

const server = http.createServer((req, res) => { /* req(uest) es lo que recibo, res(ponse) lo que envío */
    res.writeHead(200, { 'Content-Type': 'application/json' }); /* el 200 es para indicar que es una petición exitosa, el content type es para decirle en qué formato se lo envío, en este caso json */

    res.end(JSON.stringify({
        data: 'Hello World!', /* esto es lo que enviamos, convertido a string para que lo pueda leer */
    }));
});

server.listen(8000); /* cuando ejecute esto (index.js), se queda "escuchando" el puerto 8000 */

/* una vez ejecutado, para hacer la llamada se puede hacer <curl 'http://127.0.0.1:8000' -v> */

// * processing: http://127.0.0.1:8000
// *   Trying 127.0.0.1:8000...
// * Connected to 127.0.0.1 (127.0.0.1) port 8000
// > GET / HTTP/1.1
// > Host: 127.0.0.1:8000
// > User-Agent: curl/8.2.1
// > Accept: */*
// >
// < HTTP/1.1 200 OK            /* el status que yo le he dicho, 200 */
// < Content-Type: application/json                     /* el tipo de dato, json */
// < Date: Wed, 13 Dec 2023 10:11:55 GMT
// < Connection: keep-alive
// < Keep-Alive: timeout=5
// < Transfer-Encoding: chunked
// <
// {"data":"Hello World!"}* Connection #0 to host 127.0.0.1 left intact             /* los datos que le he dicho */