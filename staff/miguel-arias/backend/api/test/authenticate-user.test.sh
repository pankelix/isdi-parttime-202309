echo TEST authenticate-user

echo
echo CASE success on correct credentials

 curl 'http://localhost:8000/users/auth' \
 -H 'Content-Type: application/json' \
 -d '{ "email": "ma@zorca.com", "password": "123123123" }' \
 -v

# > POST /users/auth HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 52

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 14
# < ETag: W/"e-jvuJs6WKyNfb1YidxNhqlijD+O8"
# < Date: Thu, 14 Dec 2023 09:05:34 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# "2l9olwt97f80"

echo
echo CASE error on wrong email

 curl 'http://localhost:8000/users/auth' \
 -H 'Content-Type: application/json' \
 -d '{ "email": "wrong-ma@zorca.com", "password": "123123123" }' \
 -v

# > POST /users/auth HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 58

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Thu, 14 Dec 2023 09:12:41 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"user not found"}

echo
echo CASE error on wrong password

 curl 'http://localhost:8000/users/auth' \
 -H 'Content-Type: application/json' \
 -d '{ "email": "ma@zorca.com", "password": "wrong-123123123" }' \
 -v

# > POST /users/auth HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 58

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 47
# < ETag: W/"2f-gSxgt/X3rXUFm8ouTih67ywXda0"
# < Date: Thu, 14 Dec 2023 09:56:30 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"wrong credentials"}