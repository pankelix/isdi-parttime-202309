source colors.sh

echo -e "${blue}TEST change user email${reset}"

echo
echo -e "${green}CASE success on correct data${reset}"

curl 'http://localhost:8000/users/658f0f0ff58499e7aacac4f6/email' \
-H 'Content-Type: application/json' \
-d '{ "newEmail": "ma@zorca2.com", "newEmailConfirm": "ma@zorca2.com", "password": "123123123" }' \
-X PATCH \
-v

# > PATCH /users/658f0f0ff58499e7aacac4f6/email HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 92

# < HTTP/1.1 204 No Content
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Date: Mon, 08 Jan 2024 20:10:29 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

echo
echo -e "${tomato}CASE failure on incorrect userId${reset}"

 curl "http://localhost:8000/users/12345/email" \
 -H "Content-Type: application/json" \
 -d '{ "newEmail": "ma@zorca2.com", "newEmailConfirm": "ma@zorca2.com", "password": "123123123" }' \
 -X PATCH \
 -v

# > PATCH /users/12345/email HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 92

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 62
# < ETag: W/"3e-CtBiWDfkD80oIuJogMCTiVNeg/c"
# < Date: Mon, 08 Jan 2024 20:10:29 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"user id is not a valid id"}

echo
echo -e "${tomato}CASE failure on difference between newEmail and newEmailConfirm${reset}"

 curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/email" \
 -H "Content-Type: application/json" \
 -d '{ "newEmail": "ma@zorca2.com", "newEmailConfirm": "ma@zorca3.com", "password": "123123123" }' \
 -X PATCH \
 -v

# > PATCH /users/658f0f0ff58499e7aacac4f6/email HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 92

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 80
# < ETag: W/"50-aBnpV6+5BZ+4Wm8GPwSjgCZELIo"
# < Date: Mon, 08 Jan 2024 20:12:23 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"new email and its confirmation do not match"}

echo
echo -e "${tomato}CASE failure on empty data (newEmail)${reset}"

 curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/email" \
 -H "Content-Type: application/json" \
 -d '{ "newEmail": "", "newEmailConfirm": "ma@zorca2.com", "password": "123123123" }' \
 -X PATCH \
 -v

# > PATCH /users/658f0f0ff58499e7aacac4f6/email HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 79

# < HTTP/1.1 406 Not Acceptable
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 55
# < ETag: W/"37-2QULZIwV2e3cXO2r5RBwjlxiRDQ"
# < Date: Mon, 08 Jan 2024 20:12:23 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"ContentError","message":"new email is empty"}

echo
echo -e "${tomato}CASE failure on wrong password${reset}"

 curl "http://localhost:8000/users/658f0f0ff58499e7aacac4f6/email" \
 -H "Content-Type: application/json" \
 -d '{ "newEmail": "ma@zorca2.com", "newEmailConfirm": "ma@zorca2.com", "password": "456456456" }' \
 -X PATCH \
 -v

# > PATCH /users/658f0f0ff58499e7aacac4f6/email HTTP/1.1
# > Host: localhost:8000
# > User-Agent: curl/8.2.1
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 92

# < HTTP/1.1 401 Unauthorized
# < X-Powered-By: Express
# < Access-Control-Allow-Origin: *
# < Access-Control-Allow-Headers: *
# < Access-Control-Allow-Methods: *
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 55
# < ETag: W/"37-3mBc0WtcQO2Ze4UXSt4AJH7BRe8"
# < Date: Mon, 08 Jan 2024 20:12:23 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"CredentialsError","message":"wrong password"}