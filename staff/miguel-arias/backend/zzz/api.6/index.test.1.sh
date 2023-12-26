# para ejecutar esto poner en terminal ./index.test.sh

 curl 'http://127.0.0.1:8000' -v

# * Connected to 127.0.0.1 (127.0.0.1) port 8000
# > GET / HTTP/1.1
# > Host: 127.0.0.1:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# >
# < HTTP/1.1 200 OK
# < Content-Type: application/json
# < Date: Wed, 13 Dec 2023 10:11:55 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Transfer-Encoding: chunked
# <
# {"data":"Hello World!"}* Connection #0 to host 127.0.0.1 left intact             