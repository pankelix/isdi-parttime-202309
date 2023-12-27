source colors.sh

echo -e "${blue}TEST retrieve-post${reset}"

echo
echo -e "${green}CASE success on correct post id${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 2l9olwt97f80' \
-v

# > GET /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 2l9olwt97f80

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 777
# < ETag: W/"309-YBrv1Q+ZIMXCLSQ3/HP/Oj+gdIM"
# < Date: Fri, 22 Dec 2023 12:08:07 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# [{"id":"57m97a366js0","author":{"id":"5yr11xtj15w0","name":"Pe Pino"},"image":"https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=","text":"what a fresh day","likes":["2l9olwt97f80"],"liked":true,"fav":false},{"id":"6w4yqn3poq40","author":{"id":"2l9olwt97f80","name":"Ma Zorca"},"image":"https://tortillasnagual.com/wp-content/uploads/2022/11/Todo-sobre-la-mazorca-de-maiz-1024x704.jpg","text":"My family! :)","likes":["1c894nnhbchs"],"liked":false,"fav":false},{"id":"6l168abxmt00","author":{"id":"1c894nnhbchs","name":"Pimi Ento"},"image":"https://gastronomiaycia.republica.com/wp-content/uploads/2010/06/pimiento_morron.jpg","text":"With my cousins!","likes":[],"liked":false,"fav":false}]

echo
echo -e "${tomato}CASE failure on incorrect user id${reset}"

curl 'http://localhost:8000/posts' \
-H 'Authorization: Bearer 123456' \
-v

# > GET /posts HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Authorization: Bearer 123456

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Fri, 22 Dec 2023 12:08:07 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"user not found"}